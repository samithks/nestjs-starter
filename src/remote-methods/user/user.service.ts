import { IUpdateUserDto, CreateUserDto, LoginUserDto } from './dto';
import {
    Injectable, Logger, InternalServerErrorException, NotFoundException,
    NotAcceptableException, UnauthorizedException
} from '@nestjs/common';
import { createValidationToken, decryptValidationToken } from '../../common/utils/verification';
import { UserEntityService } from '../../models/user/user.service';
import { RoleService } from '../../models/role/role.service';
import { RoleMappingService } from '../../models/role-mapping/role-mapping.service';
import { IUser, IEmailVerified } from '../../models/user/interfaces';
import { Name } from '../../models/role/role.enum';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthService } from '../../common/authentication/auth.service';
import { UserKey } from '../../models/user/user.enum';
import { ILoggedIn } from '../../common/authentication/interfaces';

@Injectable()
export class UserService {
    constructor(
        private readonly userEntityService: UserEntityService,
        private readonly roleService: RoleService,
        private readonly roleMappingService: RoleMappingService,
        private readonly authService: AuthService,
    ) { }

    /**
     * To register a user 
     *
     * @param {CreateUserDto} createUserDto
     * @returns {Promise<IUser>}
     * @memberof UserService
     */
    async userRegistration(createUserDto: CreateUserDto): Promise<IUser> {
        try {
            const roles = await this.roleService.findByRole(Name.user);
            const createData = {
                ...createUserDto,
                verificationToken: await createValidationToken(createUserDto.username) //crypto.randomBytes(16).toString('hex')
            };
            const userData = await this.userEntityService.create(createData);
            await this.roleMappingService.create({ roleId: roles.id, userId: userData.id })
            return userData;
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     * To find the user by id
     *
     * @param {number} id
     * @returns {Promise<IUser>}
     * @memberof UserService
     */
    async findUserById(id: number): Promise<IUser> {
        try {
            return this.userEntityService.findById(id);
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     *To delete the user by id
     *
     * @param {number} id
     * @returns {Promise<DeleteResult>}
     * @memberof UserService
     */
    async deleteUserById(id: number): Promise<DeleteResult> {
        try {
            return await this.userEntityService.deleteById(id);
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     * Login to a user account
     *
     * @param {LoginUserDto} user
     * @returns {Promise<ILoggedIn>}
     * @memberof UserService
     */
    async login(user: LoginUserDto): Promise<ILoggedIn> {
        try {
            return await this.authService.login(user);
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     * To update the user by id
     *
     * @param {number} id
     * @param {IUpdateUserDto} updateUser
     * @returns {Promise<UpdateResult>}
     * @memberof UserService
     */
    async updateUserById(id: number, updateUser: IUpdateUserDto): Promise<UpdateResult> {
        try {
            return await this.userEntityService.updateById(id, updateUser);
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     * To edit the profile of the logged in user
     *
     * @param {number} id
     * @param {IUpdateUserDto} updateUser
     * @returns {Promise<UpdateResult>}
     * @memberof UserService
     */
    async updateMyProfile(id: number, updateUser: IUpdateUserDto): Promise<UpdateResult> {
        try {
            return await this.userEntityService.updateById(id, updateUser);
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     * To get the details of the logged in user
     *
     * @param {number} id
     * @returns {Promise<IUser>}
     * @memberof UserService
     */
    async getMyProfile(id: number): Promise<IUser> {
        try {
            return await this.userEntityService.findById(id);
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     * To send the verification email
     *
     * @param {number} id
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async sendEmailVerification(id: number): Promise<any> {
        try {
            const verificationDetail = await this.userEntityService.getEmailVerificationData(id);
            if (verificationDetail && verificationDetail.emailVerified) {
                throw new NotFoundException('Already Verified')
            }
            return verificationDetail;
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     * To verify the email
     *
     * @param {string} token
     * @returns {Promise<IEmailVerified>}try {
         
     } catch (error) {
         
     }
     * @memberof UserService
     */
    async verifyEmail(token: string): Promise<IEmailVerified> {
        try {
            const username = await decryptValidationToken(token);
            if (await this.userEntityService.isEmailVerified(username)) {
                throw new NotAcceptableException('Already Verified');
            }
            return await this.userEntityService.verifyEmail(username, token);
        } catch (error) {

        }
    }

    /**
     * To change the password by old password
     *
     * @param {string} username
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns {Promise<UpdateResult>}
     * @memberof UserService
     */
    async changePassword(username: string, oldPassword: string, newPassword: string): Promise<UpdateResult> {
        try {
            if (!(await this.authService.checkPassword(username, oldPassword))) {
                throw new UnauthorizedException('Wrong Credentials');
            }
            return await this.userEntityService.setPassword(username, newPassword);
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }

    /**
     * To reset the email address
     *
     * @param {string} email
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async resetPassword(email: string): Promise<any> {
        try {
            if (! await this.userEntityService.userExist(UserKey.email, email)) {
                throw new NotFoundException('User not found');
            }
            return { message: 'Email has be sent to your registered email address' };
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('Error in user registration');
        }
    }
}
