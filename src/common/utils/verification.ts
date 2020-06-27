import { decrypt, encrypt } from './crypto-function';

export const createValidationToken = async (userName: string) => encrypt(userName);

export const decryptValidationToken = async (token: string) => decrypt(token);

