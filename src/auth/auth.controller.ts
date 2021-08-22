import { Body, Controller, Get, Post, Req, UseFilters, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AnySrvRecord } from 'dns';
import { MongoExceptionFilter } from '../helpers/error.handling';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { AuthSignInCredentialsDto } from './dto/signin.credentials.dto';
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
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authService.signUp(authCredentialsDto);
    }

    @ApiTags('auth')
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}


    @ApiExcludeEndpoint()
    @Get('/google/redirect')
    @UseFilters(MongoExceptionFilter)
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req)
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