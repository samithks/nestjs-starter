import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from '../../config/constant';
import { RoleModule } from '../../models/role/role.module';
import { UserModule } from '../../models/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
    imports: [
        UserModule,
        RoleModule,
        JwtModule.register({
            secret: JWT_CONSTANTS.secret,
            signOptions: { expiresIn: JWT_CONSTANTS.expiresIn },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }