import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type venueDocument=HydratedDocument<tb_venue>

@Schema({timestamps:true})
export class tb_venue{
    @Prop()
    venueImage:string[]

    @Prop()
    venueName:string

    @Prop()
    mobileNo:string

    @Prop()
    fromAge:number

    @Prop()
    toAge:number

    @Prop()
    location:string

    @Prop()
    category:string[]

    @Prop()
    venueDescription :string

    @Prop()
    notes:string

    @Prop({enum:['general','community']})
    venueType:string

    @Prop()
    openTime :string

    @Prop()
    closeTime :string

    @Prop()
    slotDuration :string

    @Prop({default:'1'})//active status '1' and block status'0'
    status:string

}

export const venueSchema=SchemaFactory.createForClass(tb_venue)