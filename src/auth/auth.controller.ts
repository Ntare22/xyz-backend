import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MongoExceptionFilter } from '../helpers/error.handling';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
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

}
