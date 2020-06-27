import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICreateUser, IEmailVerified, ILoginDetail, IUpdateUser, IUser, IUserVerification } from './interfaces';
import { User } from './user.entity';
import { UserKey } from './user.enum';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  /**
   * To find the user by user id
   * @param id The id of the user
   * @returns {Promise<IUser>}
   * @memberof UserEntityService
   */
  async findById(id: number): Promise<IUser> {
    return this.usersRepository.findOne(id);
  }

  /**
   * To find the user by key
   * 
   * @param username The user name
   * @returns {Promise<ILoginDetail>}
   * @memberof UserEntityService
   */
  async loginDetail(username: string): Promise<ILoginDetail> {
    const userData = await this.usersRepository.findOne({ username }, { select: ['id', 'username', 'password'], relations: ['roleMapping'] });
    if (!userData) {
      return null;
    }
    return {
      id: userData.id,
      username: userData.username,
      password: userData.password,
      roleId: userData.roleMapping.map(role => role.roleId)
    };
  }

  /**
   * To create user
   *
   * @param {ICreateUser} createUser The object for user creation
   * @returns {Promise<IUser>}
   * @memberof UserEntityService
   */
  async create(createUser: ICreateUser): Promise<IUser> {
    return await this.usersRepository.save(createUser);
  }

  /**
   * To delete a user by id
   *
   * @param {number} id The id of the user
   * @returns {Promise<DeleteResult>}
   * @memberof UserEntityService
   */
  async deleteById(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  /**
   * To update the data across the user id
   *
   * @param {number} id The user id
   * @param {IUpdateUser} updateData
   * @returns {Promise<UpdateResult>}
   * @memberof UserEntityService
   */
  async updateById(id: number, updateData: IUpdateUser): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateData);
  }

  /**
   * To get email verification data by user id
   *
   * @param {number} id The user id
   * @returns {Promise<IUserVerification>}
   * @memberof UserEntityService
   */
  async getEmailVerificationData(id: number): Promise<IUserVerification> {
    return await this.usersRepository.findOne(id, { select: ['email', 'emailVerified', 'verificationToken'] })
  }

  /**
   * To verify an email by username and verification token
   *
   * @param {string} username
   * @returns {Promise<IEmailVerified>}
   * @memberof UserEntityService
   */
  async verifyEmail(username: string, verificationToken: string): Promise<IEmailVerified> {
    return (await this.usersRepository.update({ username, verificationToken }, { emailVerified: true, verificationToken: null })) && { emailVerified: true };
  }

  /**
   * To check whether a email is verified or not
   *
   * @param {string} username
   * @returns {Promise<boolean>}
   * @memberof UserEntityService
   */
  async isEmailVerified(username: string): Promise<boolean> {
    return !!(await this.usersRepository.count({ username, emailVerified: true }));
  }

  /**
   * To set the new password
   *
   * @param {string} username The username
   * @param {string} password The new password
   * @returns {Promise<UpdateResult>}
   * @memberof UserEntityService
   */
  async setPassword(username: string, password: string): Promise<UpdateResult> {
    return await this.usersRepository.update({ username }, { password });
  }

  /**
   * To check whether the user exist across the given key value
   *
   * @param {UserKey} key
   * @param {(string | number)} value
   * @returns {Promise<boolean>}
   * @memberof UserEntityService
   */
  async userExist(key: UserKey, value: string | number): Promise<boolean> {
    return !!(await this.usersRepository.count({ [key]: value }));
  }
}
