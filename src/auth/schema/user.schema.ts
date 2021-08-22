import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NormalUser } from 'src/common/reg-users/schema/reg-users.schema';
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

    // @Prop({type: [Types.ObjectId], ref: NormalUser.name})
    @Prop([{}])
    normalUsers!: NormalUser[];

    @Prop()
    verifiedEmail: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('NormalUser', {
    ref: 'NormalUser',
    localField: '_id',
    foreignField: 'ownerId',
});