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


export class RegCompanyCredentialsDto {
    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    compyName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    country: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    state: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    city: string;

    @ApiProperty()
    @IsString()
    street: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;

}