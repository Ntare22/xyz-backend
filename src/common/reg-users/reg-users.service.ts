import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { NormalUser, NormalUserDocument } from "./schema/reg-users.schema";
import { NormalUserRepository } from "./reg-users.repository";
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

        

        return this.normalUserRepositoty.findOneAndUpdate(ownerId, {$push: { normalUsers: newUser }});
    }
}



// {
//     "firstName": "nankim",
//     "lastName": "nk",
//     "gender": "Female",
//     "birthDate": "2019-08-19",
//     "email": "nankim@test.com",
//     "phoneNumber": "+250782015589",
//     "address": "Rwanda/Kigali",
//     "password": "123Qwert@",
//     "createdAt": "2021-08-19T19:16:24.118Z",
//     "updatedAt": "2021-08-19T19:16:24.118Z"
//   }