const {defineConfig} = require('cypress');
const path = require('path');
const fs = require('fs-extra');
const dotenv = require('dotenv');
const axios = require('axios');
const {Client} = require('pg');

const FEATURE_FLAGS_URL = `https://static.myapp.test/config/features.json`;
const configPath = path.resolve(path.join(process.cwd(), 'cypress/fixtures/features.json'));

const printCurrentToggleData = (data) => {
  console.log(`Current feature toggle config:`);
  console.log(`*********************`);
  console.log(data);
  console.log(`\n`);
};

const loadFeatureFlags = async () => {
  try {
    const response = await axios.get(FEATURE_FLAGS_URL);
    const data = JSON.stringify(response.data);
    printCurrentToggleData(data);
    await fs.outputFile(configPath, data);
  } catch (e) {
    throw new Error(e);
  }
};

const getEnvConfig = async (env) => {
  const configFile = path.resolve(path.join(process.cwd(), `cypress/config/${env}.json`));
  return await fs.readJSON(configFile);
};

const queryDatabase = async (sql, config) => {
  const client = new Client(config);
  await client.connect();
  const resultSet = await client.query(sql);
  await client.end();
  return resultSet.rows;
};

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Load environment variables
      const env = config.env.envFile;
      dotenv.config({path: `.env.${env}`});

      // Fetch latest feature flags config
      await loadFeatureFlags();

      // Custom tasks
      on('task', {
        queryDatabase: async (sql) => {
          return await queryDatabase(sql, {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
            ssl: false,
          });
        },
      });

      // Plugins
      require('cypress-fail-fast/plugin')(on, config);

      // Configure environment
      const configFromFile = await getEnvConfig(env);
      config = {
        ...configFromFile,
        env: {...configFromFile.env, ...config.env},
      };
      return config;
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**',
  },
});
