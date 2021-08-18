import { Body, Controller, Post, UseFilters, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AnySrvRecord } from 'dns';
import { MongoExceptionFilter } from '../helpers/error.handling';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, AuthSignInCredentialsDto } from './dto/auth.credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './schema/user.schema';

@Controller('/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiTags('auth')
    @ApiBody({ type: AuthCredentialsDto })
    @Post('/signup')
    @UseFilters(MongoExceptionFilter)
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }

    @ApiTags('auth')
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Body() authSignInCredentialsDto: AuthSignInCredentialsDto): Promise<User> {
        const requestBody: any = { 
            email: authSignInCredentialsDto.email, 
            password: authSignInCredentialsDto.password
        }
        return this.authService.signIn(requestBody);
    }

    

    @ApiTags('auth')
    @UseGuards(JwtAuthGuard)
    @Get('users')
    async getUser(@Request() authCredentialsDto: AuthCredentialsDto): Promise<any> {
        return  authCredentialsDto.email;
    }


}
