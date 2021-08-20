import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserRoles } from './user.roles.enum';
import { UsersRepository } from './users.repository';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { sendEmail } from 'src/helpers/sendEmail';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private usersRepository: UsersRepository,
    ) {}
    
    
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { firstName, lastName, email, phoneNumber, nidNumber, password, } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        await this.usersRepository.create({
            id: uuid(),
            firstName,
            lastName,
            email,
            nidNumber,
            phoneNumber,
            password: hashedPassword,
            role: UserRoles.OWNER,
            companies: [],
            verifiedEmail: false
        });
        sendEmail()
        return 'user has successfully signed up'
    }

    googleLogin(req) {
        if (!req.user) {
            return 'User not identified'
        }
        console.log(req)

        return {
            message: 'User information from google',
            user: req.user
        }
    }
}
