import { Name } from '../../../models/role/role.enum';

export interface IJwtPayload {
    readonly username: string;
    readonly sub: { id: number, roles: [Name] }
}