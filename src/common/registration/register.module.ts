import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { RegCompanyController, RegUserController } from './register.controller';
import { RegisterServices } from './register.service';
import { RegCompany, RegCompanySchema } from './schema/reg-company.schema';
import { NormalUser, NormalUserSchema } from "./schema/reg-users.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: NormalUser.name, schema: NormalUserSchema },
            { name: User.name, schema: UserSchema},
            { name: RegCompany.name, schema: RegCompanySchema},
        ]),
    ],
    controllers: [RegUserController, RegCompanyController],
    providers: [RegisterServices],
    exports: [RegisterServices]
})
export class RegisterModule {}