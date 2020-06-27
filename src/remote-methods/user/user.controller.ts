import {
  Body, Controller, Delete, Get, Param, Patch, Post,
  Put, Query, UsePipes
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ILoggedIn } from '../../common/authentication/interfaces';
import { Auth, User } from '../../common/decorators';
import { EmailValidatePipe, ParseIntPipe, ValidationPipe } from '../../common/pipes/';
import { Name } from '../../models/role/role.enum';
import { IEmailVerified, IUser } from '../../models/user/interfaces/';
import { CreateUserDto, IUpdateUserDto, LoginUserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  /**
   * The endpoint to get a user detail by user id
   * 
   * @api {get} /user/:id
   * @apiName findById
   * @apiGroup User
   * @apiDescription The endpoint to get a user detail by user id
   *
   * @param {number} id The user id
   * @returns {Promise<IUser>}
   * @memberof UserController
   */
  @Auth(Name.admin)
  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number): Promise<IUser> {
    return await this.userService.findUserById(id);
  }

  /**
   * End point to create a user from user object
   * 
   * @api {post} /user/
   * @apiName register
   * @apiGroup User
   * @apiDescription The endpoint to register a user
   * 
   * @param {CreateUserDto} createUserDto The user object
   * @returns {Promise<IUser>}
   * @memberof UserController
   */
  @Auth(Name.admin)
  @Post()
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.userService.userRegistration(createUserDto);
  }


  /**
   * Login to a user account
   *
   * @api {post} /user/login
   * @apiName login
   * @apiGroup User
   * @apiDescription To login to a account
   * 
   * @param {LoginUserDto} user
   * @returns {Promise<ILoggedIn>}
   * @memberof UserController
   */
  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<ILoggedIn> {
    return await this.userService.login(user);
  }

  /**
   * To delete a user by id
   *
   * @api {delete} /user/:id
   * @apiName deleteUserById
   * @apiGroup User
   * @apiDescription To delete a user
   * 
   * @param {number} id The user id
   * @returns {Promise<DeleteResult>}
   * @memberof UserController
   */
  @Auth(Name.admin)
  @Delete(':id')
  async deleteUserById(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return await this.userService.deleteUserById(id);
  }

  /**
   * To update the user by id
   *
   * @api {patch} /user/:id
   * @apiName updateUserById
   * @apiGroup User
   * @apiDescription To update the user detail
   * 
   * @param {number} id The user id
   * @param {IUpdateUserDto} updateUser
   * @returns {Promise<UpdateResult>}
   * @memberof UserController
   */
  @Auth(Name.admin)
  @Patch(':id')
  async updateUserById(@Param('id', new ParseIntPipe()) id: number,
    @Body() updateUser: IUpdateUserDto): Promise<UpdateResult> {
    return await this.userService.updateUserById(id, updateUser);
  }

  /**
   * To edit the profile of the logged in user
   * 
   * @api {patch} /user/profile
   * @apiName updateUserById
   * @apiGroup User
   * @apiDescription To update the user detail
   * 
   * @param {number} id The user id
   * @param {IUpdateUserDto} updateUser
   * @returns {Promise<UpdateResult>}
   * @memberof UserController
   */
  @Auth(Name.user)
  @Patch('profile')
  async updateMyProfile(@User('userId', new ParseIntPipe()) id: number,
    @Body() updateUser: IUpdateUserDto): Promise<UpdateResult> {
    return await this.userService.updateMyProfile(id, updateUser);
  }

  /**
   * To get the details of the logged in user
   * 
   * @api {patch} /user/profile/me
   * @apiName getMyProfile
   * @apiGroup User
   * @apiDescription To get the details of the logged in user
   * 
   * @param {number} id The user id
   * @returns {Promise<IUser>}
   * @memberof UserController
   */
  @Auth(Name.user)
  @Get('profile/me')
  async getMyProfile(@User('userId', new ParseIntPipe()) id: number): Promise<IUser> {
    return await this.userService.getMyProfile(id);
  }

  /**
   * To update the user detail
   * 
   * @api {patch} /user/resend-verification
   * @apiName sendEmailVerification
   * @apiGroup User
   * @apiDescription To update the user detail
   * 
   * @param {number} id The user id
   * @returns {Promise<any>}
   * @memberof UserController
   */
  @Auth(Name.user)
  @Put('resend-verification')
  async sendEmailVerification(@User('userId') id: number): Promise<any> {
    return await this.userService.sendEmailVerification(id);
  }

  /**
   * To verify the email
   * 
   * @api {patch} /user/verify-email
   * @apiName verifyEmail
   * @apiGroup User
   * @apiDescription To verify the email
   * 
   * @param {string} token The token for email verification
   * @returns {Promise<IEmailVerified>}
   * @memberof UserController
   */
  @Auth(Name.user)
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<IEmailVerified> {
    return await this.userService.verifyEmail(token);
  }

  /**
   * To change the password by old password
   * 
   * @api {patch} /user/password/change
   * @apiName changePassword
   * @apiGroup User
   * @apiDescription To change the password by old password
   * 
   * @param {string} username The username of the user
   * @param {string} oldPassword The old password
   * @param {string} newPassword The new password
   * @returns {Promise<UpdateResult>}
   * @memberof UserController
   */
  @Auth(Name.user)
  @Patch('password/change')
  async changePassword(@User('username') username: string, @Query('oldPassword') oldPassword: string,
    @Query('newPassword') newPassword: string): Promise<UpdateResult> {
    return await this.userService.changePassword(username, oldPassword, newPassword);
  }

  /**
   * To reset the email address
   * 
   * @api {patch} /user/password/reset
   * @apiName resetPassword
   * @apiGroup User
   * @apiDescription To reset the email address
   * 
   * @param {string} email The email address
   * @returns {Promise<string>}
   * @memberof UserController
   */
  @Get('password/reset')
  async resetPassword(@Query('email', new EmailValidatePipe()) email: string): Promise<any> {
    return await this.userService.resetPassword(email);
  }
}
