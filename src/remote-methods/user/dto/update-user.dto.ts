import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender } from '../../../models/user/user.enum';

export class IUpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly fullName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    readonly dob?: Date;

    @ApiPropertyOptional({ enum: Gender })
    @IsOptional()
    @IsEnum(Gender)
    readonly gender?: Gender;
}