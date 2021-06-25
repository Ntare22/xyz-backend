import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from '../user.roles.enum';

export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop()
    id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ unique: true })
    nidNumber: string;

    @Prop({ unique: true })
    phoneNumber: string;
    
    @Prop()
    password: string;

    @Prop()
    role: UserRoles;

    @Prop([String])
    companies: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);