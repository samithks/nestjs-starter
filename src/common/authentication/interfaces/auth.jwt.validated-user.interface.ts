import { Name } from '../../../models/role/role.enum';

export interface IJwtValidated {
    readonly username: string;
    readonly userId: number
    readonly roles: [Name]
}