import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import {Type} from 'class-transformer';
import { Gender } from '../../../models/user/user.enum';


export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly dob?: Date;

    @ApiPropertyOptional({ enum: Gender })
    @IsOptional()
    @IsEnum(Gender)
    readonly gender?: Gender;
}