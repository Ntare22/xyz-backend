import { ApiProperty } from '@nestjs/swagger';
import { 
    Matches, 
    IsEmail, 
    IsString, 
    MaxLength, 
    MinLength, 
 } from 'class-validator';

export class AuthSignInCredentialsDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak'
    })
    password: string;
}