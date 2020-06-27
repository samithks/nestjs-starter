import { compare } from 'bcrypt';

export const comparePasswords = async (userPassword: string, currentPassword: string): Promise<boolean> => {
    return await compare(currentPassword, userPassword);
};

export const matchRoles = (roles: string[], userRoles: string[]): boolean =>
    userRoles.some(role => roles.includes(role));