import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, Types } from "mongoose";

export type bookingDocument=HydratedDocument<tb_booking>

@Schema({timestamps:true})
export class tb_booking{
    @Prop({type:Types.ObjectId})
    userId:ObjectId

    @Prop({type:Types.ObjectId})
    venueId:ObjectId

    @Prop({type:Types.ObjectId})
    slotId:ObjectId

    @Prop()
    userName:string

    @Prop()
    mobileNo:string

    @Prop()
    profile:string

    @Prop({type:Types.ObjectId})
    bookedBy:ObjectId

    @Prop({default:'1'})//active status '1' and block status'0'
    status: string

}

export const bookingSchema=SchemaFactory.createForClass(tb_booking)