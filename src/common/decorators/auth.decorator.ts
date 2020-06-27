import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Name } from '../../models/role/role.enum';
import { JwtAuthGuard, RolesGuard } from '../guards';
import { Roles } from './roles.decorator';

export function Auth(roles: Name) {
    return applyDecorators(
        Roles(roles),
        UseGuards(JwtAuthGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
    );
}