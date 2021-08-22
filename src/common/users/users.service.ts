import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { NormalUser, NormalUserDocument } from "./schema/users.schema";
import { NormalUserRepository } from "./users.repository";
import { RegUserCredentialsDto } from "./dto/reg-users.credentials.dto";
import { User } from "src/auth/schema/user.schema";
import { FilterQuery } from "mongoose";


@Injectable()
export class RegUserService {
    constructor(
        @InjectModel(User.name)
        private normalUserRepositoty: NormalUserRepository,
    ){}

    async registerUser(ownerId: RegUserCredentialsDto, regUserCredentialsDto: RegUserCredentialsDto): Promise<NormalUser> {
        const defaultPwd = '123Qwert@'
        const {
            firstName, 
            lastName,
            gender,
            birthDate,
            email,
            phoneNumber,
            address,
        } = regUserCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(defaultPwd, salt);

        const newUser: any = {
                id: uuid(),
                firstName, 
                lastName,
                gender,
                birthDate,
                email,
                phoneNumber,
                address,
                password: hashedPassword
            };
        
        const user = await this.normalUserRepositoty.findOne({ "normalUsers.email": email })
       
        if (!user) {
            return this.normalUserRepositoty.findOneAndUpdate(ownerId, {$push: { normalUsers: newUser }});
        }
        else {
            const errorMessage: any = {"error": "User already exits!"}
            return errorMessage;
        }
    }
}
