import { ApiProperty } from '@nestjs/swagger';

import {
    Matches,
    IsEmail,
    MaxLength,
    MinLength,
    IsPhoneNumber,
    IsString,
    IsDate
} from 'class-validator';


export class RegUserCredentialsDto {
    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstName: string;

    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    lastName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    gender: string;

    @ApiProperty()
    @IsString()
    birthDate: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak'
    })
    password: string;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;

}