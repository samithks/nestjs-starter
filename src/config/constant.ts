import { homedir } from 'os';
import { join } from 'path';

// Constants
export const ENV_PATH = join(homedir(), 'env/nestjs-starter/.env'); // Env Path
export const SALT_ROUNDS = 10;
export const CLIENT_ROLE = 'user';
export const EMAIL_ENCRYPTION_KEY = 'WKvbvwbEgKeJZ0TIHrVIarsRyahvXPZl'; // Must be 256 bits (32 characters)
export const EMAIL_ENCRYPTION_IV_LENGTH = 16; // For AES, this is always 16
export const JWT_CONSTANTS = {
    secret: 'Jgymn4WoFHA5LaV43CXC0YaRFl87FIsL',
    expiresIn: '1d'
};