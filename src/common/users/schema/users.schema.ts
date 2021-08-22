import { Prop, Schema, SchemaFactory }  from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type NormalUserDocument = NormalUser & Document;

@Schema()
export class NormalUser {
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    gender: string;

    @Prop()
    birthDate: string;

    @Prop()
    email: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    address: string;

    @Prop()
    password: string;

    @Prop()
    createdAt!: Date;

    @Prop()
    updatedAt!: Date;
}

export const NormalUserSchema = SchemaFactory.createForClass(NormalUser);