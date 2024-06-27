import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type generalDetailsDocument= HydratedDocument<tb_general_details>
@Schema({timestamps:true})
export class tb_general_details{

    @Prop({type:Types.ObjectId})
    venueId:string

    @Prop({enum:['fullDay','session']})
    slotType:string

    @Prop()
    adultsPriceForWeekdays:number

    @Prop()
    childrenPriceForWeekdays:number

    @Prop()
    adultsPriceForWeekends:number

    @Prop()
    childrenPriceForWeekdends:number

    @Prop()
    noOfSeats:number

    @Prop({default:"1"})//active status '1' and block status'0'
    status: string
}
export const generalSchema=SchemaFactory.createForClass(tb_general_details)