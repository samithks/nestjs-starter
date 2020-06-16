import { Name } from "../../../models/role/role.enum";

export interface IValidateUser {
    readonly username: string;
    readonly id:number;
    readonly roles: Name[]
}