import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type userDocument=HydratedDocument<tb_user>

@Schema({timestamps:true})
export class tb_user{

    @Prop()
    profile:string

    @Prop()
    userName:string

    @Prop()
    mobileNo:string 

    @Prop({ default: '1' }) //active status '1' and block status'0'
    status: string
}

export const userSchema=SchemaFactory.createForClass(tb_user)