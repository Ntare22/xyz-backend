import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { RegUserController } from './reg-users.controller';
import { RegUserService } from './reg-users.service';
import { NormalUser, NormalUserSchema } from "./schema/reg-users.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: NormalUser.name, schema: NormalUserSchema },
            { name: User.name, schema: UserSchema},
            
        ]),
    ],
    controllers: [RegUserController],
    providers: [RegUserService],
    exports: [RegUserService]
})
export class RegUserModule {}