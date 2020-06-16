import { SetMetadata } from '@nestjs/common';
import { Name } from '../../models/role/role.enum';

export const Roles = (...roles: Name[]) => SetMetadata('roles', roles);