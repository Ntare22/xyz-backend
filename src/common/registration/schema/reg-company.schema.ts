import { Prop, Schema, SchemaFactory }  from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type RegCompanyDocument = RegCompany & Document;

@Schema()
export class RegCompany {
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;

    @Prop()
    comapnyName: string;

    @Prop()
    country: string;

    @Prop()
    state: string;

    @Prop()
    city: string;

    @Prop()
    street: string;

    @Prop()
    email: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    createdAt!: Date;

    @Prop()
    updatedAt!: Date;
}

export const RegCompanySchema = SchemaFactory.createForClass(RegCompany);