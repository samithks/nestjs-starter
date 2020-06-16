import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONSTANTS } from '../../../config/constant';
import { IJwtPayload, IJwtValidated } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANTS.secret,
        });
    }

    /**
     *
     *
     * @param {IJwtPayload} payload
     * @returns {Promise<IJwtValidated>}
     * @memberof JwtStrategy
     */
    async validate(payload: IJwtPayload): Promise<IJwtValidated> {
        return { userId: payload.sub.id, username: payload.username, roles: payload.sub.roles };
    }
}