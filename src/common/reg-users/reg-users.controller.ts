import { Body, Controller, Post, UseFilters, UseGuards, Get } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MongoExceptionFilter } from 'src/helpers/error.handling';
import { RegUserCredentialsDto } from './dto/reg-users.credentials.dto';
import { RegUserService } from './reg-users.service';


@Controller('/v1')
export class RegUserController {
    constructor(private regUserService: RegUserService) {}

    @ApiBody({ type: RegUserCredentialsDto })
    @Post('/register_user')
    @UseFilters(MongoExceptionFilter)
    async registerUser(@Body() regUserCredentialsDto: RegUserCredentialsDto): Promise<any> {
        const ownerId: any = { id: "e9789fc2-cb17-4ec1-8800-61ba69d97088" };
        return this.regUserService.registerUser(ownerId, regUserCredentialsDto);
    }
}