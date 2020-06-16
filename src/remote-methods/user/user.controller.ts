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
   * @param {number} id
   * @returns {Promise<DeleteResult>}
   * @memberof UserController
   */
  @Auth(Name.admin)
  @Delete()
  async deleteUserById(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return await this.userService.deleteUserById(id);
  }

  /**
   * To update the user by id
   *
   * @param {number} id
   * @param {IUpdateUserDto} updateUser
   * @returns {Promise<UpdateResult>}
   * @memberof UserController
   */
  @Auth(Name.admin)
  @Patch()
  async updateUserById(@Param('id', new ParseIntPipe()) id: number,
    @Body() updateUser: IUpdateUserDto): Promise<UpdateResult> {
    return await this.userService.updateUserById(id, updateUser);
  }

  /**
   * To edit the profile of the logged in user
   *
   * @param {number} id
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
   * @param {number} id
   * @returns {Promise<IUser>}
   * @memberof UserController
   */
  @Auth(Name.user)
  @Get('profile/me')
  async getMyProfile(@User('userId', new ParseIntPipe()) id: number): Promise<IUser> {
    return await this.userService.getMyProfile(id);
  }

  /**
   *
   *
   * @param {number} id
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
   * @param {string} token
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
   * @param {string} username
   * @param {string} oldPassword
   * @param {string} newPassword
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
   * @param {string} email
   * @returns {Promise<string>}
   * @memberof UserController
   */
  @Get('password/reset')
  async resetPassword(@Query('email', new EmailValidatePipe()) email: string): Promise<any> {
    return await this.userService.resetPassword(email);
  }
}
