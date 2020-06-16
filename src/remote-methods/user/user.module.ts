import { Module } from '@nestjs/common';
import { AuthModule } from '../../common/authentication/auth.module';
import { RoleMappingModule } from '../../models/role-mapping/role-mapping.module';
import { RoleModule } from '../../models/role/role.module';
import { UserModule } from '../../models/user/user.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserModule, AuthModule, RoleModule, RoleMappingModule],
  providers: [UserService],
  controllers: [UserController]
})
export class RemoteUserModule { }