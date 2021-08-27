import { Body, Controller, Post, UseFilters, UseGuards, Get } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MongoExceptionFilter } from 'src/helpers/error.handling';
import { RegCompanyCredentialsDto } from './dto/reg-compamy';
import { RegUserCredentialsDto } from './dto/reg-users.credentials.dto';
import { RegisterServices } from './register.service';


@Controller('/v1')
export class RegUserController {
    constructor(private RegisterServices: RegisterServices) {}

    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: RegUserCredentialsDto })
    @Post('/register_user')
    @UseFilters(MongoExceptionFilter)
    async registerUser(@Body() regUserCredentialsDto: RegUserCredentialsDto): Promise<any> {
        // This ownerId variable will be removed
        const ownerId: any = { id: regUserCredentialsDto };
        return this.RegisterServices.registerUser(ownerId, regUserCredentialsDto);
    }
}

@Controller('/v1')
export class RegCompanyController {
    constructor(private RegisterServices: RegisterServices) {}

    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: RegUserCredentialsDto })
    @Post('/register_company')
    @UseFilters(MongoExceptionFilter)
    async registerUser(@Body() regCompanyCredentialsDto: RegCompanyCredentialsDto): Promise<any> {
        // This ownerId variable will be removed
        const ownerId: any = { id: regCompanyCredentialsDto };
        return this.RegisterServices.registerCompany(ownerId, regCompanyCredentialsDto);
    }
}

