import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, ObjectId, Types } from "mongoose"

export type slotDocument=HydratedDocument<tb_slot>
@Schema({timestamps:true})
export class tb_slot{
    @Prop()
    startTime:Date

    @Prop()
    endTime:Date

    @Prop()
    slotDate:Date

    @Prop({type:Types.ObjectId})
    venueId:Types.ObjectId

    @Prop({default:"1"})//active status '1' and block status'0'
    status:string

}
export const slotSchema=SchemaFactory.createForClass(tb_slot)