export interface IUserVerification {
  readonly email: string;
  readonly emailVerified: boolean;
  readonly verificationToken?: string;
}