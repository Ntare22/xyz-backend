import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { NormalUser, NormalUserDocument } from "./schema/reg-users.schema";
import { CompanyRepository, NormalUserRepository } from "./register.repository";
import { RegUserCredentialsDto } from "./dto/reg-users.credentials.dto";
import { User } from "src/auth/schema/user.schema";
import { FilterQuery } from "mongoose";
import { RegCompanyCredentialsDto } from "./dto/reg-compamy";
import { RegCompany } from "./schema/reg-company.schema";


@Injectable()
export class RegisterServices {
    constructor(
        @InjectModel(User.name)
        private normalUserRepositoty: NormalUserRepository,
        private companyRepository: CompanyRepository,
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

    async registerCompany(ownerId: RegCompanyCredentialsDto, regCompanyCredentialsDto:RegCompanyCredentialsDto): Promise<RegCompany> {
        const defaultPwd = '123Qwert@'
        const {
            compyName,
            country,
            state,
            city,
            street,
            email,
            phoneNumber,
        } = regCompanyCredentialsDto;

        const newCompany: any = {
                id: uuid(),
                compyName,
                country,
                state,
                city,
                street,
                email,
                phoneNumber,
            };
        
        const company = await this.companyRepository.findOne({ "company.email": email })
       
        if (!company) {
            return this.companyRepository.findOneAndUpdate(ownerId, {$push: { company: newCompany }});
        }
        else {
            const errorMessage: any = {"error": "Company already exits!"}
            return errorMessage;
        }
    }
}
