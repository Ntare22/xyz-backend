import { Body, Controller, Post, UseFilters, UseGuards, Get } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MongoExceptionFilter } from 'src/helpers/error.handling';
import { RegUserCredentialsDto } from './dto/reg-users.credentials.dto';
import { RegUserService } from './reg-users.service';


@Controller('/v1')
export class RegUserController {
    constructor(private regUserService: RegUserService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: RegUserCredentialsDto })
    @Post('/register_user')
    @UseFilters(MongoExceptionFilter)
    async registerUser(@Body() regUserCredentialsDto: RegUserCredentialsDto): Promise<any> {
        // This ownerId variable will be removed
        const ownerId: any = { id: regUserCredentialsDto };
        return this.regUserService.registerUser(ownerId, regUserCredentialsDto);
    }
}