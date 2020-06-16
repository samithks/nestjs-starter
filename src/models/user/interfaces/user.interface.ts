import { Gender } from '../user.enum';

export interface ICreateUser {
  readonly email: string;
  readonly username: string;
  readonly phoneNumber: string;
  readonly fullName: string;
  readonly verificationToken: string;
  readonly dob?: Date | null;
  readonly gender?: Gender | null;
}