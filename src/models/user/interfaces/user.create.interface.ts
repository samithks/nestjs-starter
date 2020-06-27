import { Gender } from '../user.enum';

export interface IUser {
  readonly id: number;
  readonly email: string;
  readonly username: string;
  readonly phoneNumber: string;
  readonly fullName: string;
  readonly emailVerified: boolean;
  readonly verificationToken?: string;
  readonly dob?: Date | null;
  readonly gender?: Gender | null;
  readonly isSubscribed: boolean;
  readonly createdAt: Date;
  readonly updatedAt?: Date | null;
  readonly isDeleted: boolean;
}