import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AuthCredentialsDto, AuthSignInCredentialsDto } from './dto/auth.credentials.dto';
import { UserRoles } from './user.roles.enum';
import { UsersRepository } from './users.repository';
import { User } from './schema/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}
    
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { firstName, lastName, email, phoneNumber, nidNumber, password, } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        return this.usersRepository.create({
            id: uuid(),
            firstName,
            lastName,
            email,
            nidNumber,
            phoneNumber,
            password: hashedPassword,
            role: UserRoles.OWNER,
            companies: [],
        }); 
    }

    async signIn(user: User): Promise<any> {
        const payload: any = { email: user.email, sub: user.id };
        return {
            email: user.email,
            accessToken: this.jwtService.sign(payload)
        };
    }

    async validateUser( email: string, password: string): Promise<User> {
        const user = await this.usersRepository.findOne({ email });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
            return user;
        }
    
        return null;
    }
}
