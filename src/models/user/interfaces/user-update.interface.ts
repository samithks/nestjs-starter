import { Gender } from '../user.enum';

export interface IUpdateUser {
    firstName?: string;
    dob?: Date;
    gender?: Gender;
}