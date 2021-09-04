import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RegCompany } from 'src/common/registration/schema/reg-company.schema';
import { NormalUser } from 'src/common/registration/schema/reg-users.schema';
import { UserRoles } from '../user.roles.enum';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
    @Prop({ type: Types.ObjectId })
    id: Types.ObjectId;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop({ unique: true })
    nidNumber: string;

    @Prop()
    phoneNumber: string;
    
    @Prop()
    password: string;

    @Prop()
    role: UserRoles;

    @Prop([String])
    companies: string[];

    @Prop()
    verifiedEmail: boolean;
   
    @Prop([{}])
    normalUsers!: NormalUser[];

    @Prop([{}])
    company!: RegCompany[];

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('NormalUser', {
    ref: 'NormalUser',
    localField: '_id',
    foreignField: 'ownerId',
});
