import {hashSync, compareSync} from 'bcrypt';
import {PASSWORD_SALT_ROUNDS} from 'support/constants';
import {v4 as uuidv4} from 'uuid';

export const hashPassword = (plainText) => {
  return hashSync(plainText, PASSWORD_SALT_ROUNDS);
};

export const isPasswordValid = (plainText, hashedValue) => {
  return compareSync(plainText, hashedValue);
};

export const getRandomUUID = () => {
  return uuidv4();
};
