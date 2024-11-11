// General navbar
const searchJobsLink = `[data-testid=header-cf-search-jobs-button]`;
const seekCareerAdviceLink = `[data-testid=header-cf-career-advice-button]`;
const boostYourCareerLink = `[data-testid=header-cf-boost-career-button]`;
const logoLink = `[data-testid=header-cf-logo]`;
const loginLink = `[data-testid=login-button]`;
const logoutLink = `[data-testid=logout-button]`;

// Masthead
const mastHeadText = `#sgds-masthead .is-text`;
const mastHeadButton = `[data-testid=how-to-identify]`;
const mastHeadExpandedTitle1 = `[data-testid=masthead-content] .column-wrapper:nth-child(1) .title`;
const mastHeadExpandedContent1 = `[data-testid=masthead-content] .column-wrapper:nth-child(1) article`;
const mastHeadExpandedTrustedWebsitesLink = `[data-testid=masthead-trusted-websites-link]`;
const mastHeadExpandedTitle2 = `[data-testid=masthead-content] .column-wrapper:nth-child(2) .title`;
const mastHeadExpandedContent2 = `[data-testid=masthead-content] .column-wrapper:nth-child(2) article`;

export const verifyLoaded = () => {
  cy.log(`Verify if navbar is loaded`);

  cy.get(logoLink).should('be.visible');
  cy.verifyAttribute(logoLink, 'alt', 'MyCareersFuture');
  cy.verifyLink(logoLink, '/');

  cy.get(searchJobsLink).should('have.text', 'Search Jobs');
  cy.verifyLink(searchJobsLink, 'https://www.mycareersfuture.gov.sg/');

  cy.get(seekCareerAdviceLink).should('have.text', 'Seek Career Advice');
  cy.verifyLink(seekCareerAdviceLink, 'https://content.mycareersfuture.gov.sg/');

  cy.get(boostYourCareerLink).should('have.text', 'Boost Your Career');
  cy.verifyLink(boostYourCareerLink, '/');

  cy.get(loginLink).should('have.text', 'Login');
};

export const verifyLoggedIn = () => {
  cy.log(`Verify if the user is logged in`);
  cy.get(logoutLink).should('be.visible');
};

export const verifyLoggedOut = () => {
  cy.log(`Verify if the user is logged out`);
  cy.get(loginLink).should('be.visible');
};

export const verifyMastHead = () => {
  cy.log(`Verify mast head`);

  cy.get(mastHeadText).should('have.text', 'A Singapore Government Agency Website');
  cy.get(mastHeadButton).should('have.text', 'How to identify');

  cy.get(mastHeadButton).click();
  cy.get(mastHeadExpandedTitle1).should('have.text', 'Official website links end with .gov.sg');
  cy.get(mastHeadExpandedContent1).should(
    'have.text',
    `Government agencies communicate via .gov.sg websites (e.g. go.gov.sg/open).`,
  );
  cy.get(mastHeadExpandedTrustedWebsitesLink).should('have.text', 'Trusted websites');
  cy.verifyLink(mastHeadExpandedTrustedWebsitesLink, `https://www.gov.sg/trusted-sites#govsites`, true);

  cy.get(mastHeadExpandedTitle2).should('have.text', `Secure websites use HTTPS`);
  cy.get(mastHeadExpandedContent2).should('have.text', `Look for a lock`);
  cy.get(mastHeadExpandedContent2).should(
    'have.text',
    `or https:// as an added precaution. Share sensitive information only on official, secure websites.`,
  );
};
