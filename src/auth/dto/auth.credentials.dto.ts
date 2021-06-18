import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsEmail, IsString, MaxLength, MinLength, IsOptional, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class AuthCredentialsDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    firstName: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    lastName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(16)
    @MaxLength(16)
    nidNumber: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak'
    })
    password: string;

}