import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../../models/role/role.service';
import { UserEntityService } from '../../models/user/user.service';
import { comparePasswords } from '../utils/authentication';
import { ILoggedIn, ILogin, IValidateUser } from './interfaces';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserEntityService,
        private readonly jwtService: JwtService,
        private readonly roleService: RoleService
    ) { }

    /**
     * To check whether a user exist with given username and password
     *
     * @param {string} username
     * @param {string} pass
     * @returns {Promise<IValidateUser>}
     * @memberof AuthService
     */
    async validateUser(username: string, pass: string): Promise<IValidateUser> {
        const user = await this.usersService.loginDetail(username);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        const roleData = await this.roleService.getRolesByIds(user.roleId);
        // compare passwords
        if (!await comparePasswords(user.password, pass)) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return {
            username: user.username,
            id: user.id,
            roles: roleData.roles
        };
    }

    /**
     * To check whether the given username and password are valid
     *
     * @param {string} username
     * @param {string} pass
     * @returns {Promise<boolean>}
     * @memberof AuthService
     */
    async checkPassword(username: string, pass: string): Promise<boolean> {
        const user = await this.usersService.loginDetail(username);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        return await comparePasswords(user.password, pass);
    }

    /**
     * To generate access token for the valid user
     *
     * @param {ILogin} user
     * @returns {Promise<ILoggedIn>}
     * @memberof AuthService
     */
    async login(user: ILogin): Promise<ILoggedIn> {
        const userData = await this.validateUser(user.username, user.password);
        const payload = { username: userData.username, sub: { id: userData.id, roles: userData.roles } };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}