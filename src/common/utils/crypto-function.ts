import crypto from 'crypto';
import { EMAIL_ENCRYPTION_IV_LENGTH, EMAIL_ENCRYPTION_KEY } from '../../config/constant';

/**
 * To encrypt a text with node crypto
 *
 * @param {string} text The text to be encrypted
 * @returns
 */
export const encrypt = function (text: string) {
    try {
        const iv = crypto.randomBytes(EMAIL_ENCRYPTION_IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(EMAIL_ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (error) {
        throw error;
    }
}

/**
 * To decrypt a text with node crypto
 *
 * @param {string} text The text to be encrypted
 * @returns
 */
export const decrypt = function (text: string) {
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(EMAIL_ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    } catch (error) {
        throw error;
    }
}