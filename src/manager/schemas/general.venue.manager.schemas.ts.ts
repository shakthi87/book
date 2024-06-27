import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type generalVenueManagerDocument = HydratedDocument<tb_general_venue_manager>
@Schema({ timestamps: true })
export class tb_general_venue_manager {

    @Prop()
    profile:string
   
    @Prop()
    userId: string

    @Prop()
    venueId: string

    @Prop()
    userName: string

    @Prop()
    mobileNo: string

    @Prop({ default: '1' }) //active status '1' and block status'0' 
    status: string
}

export const generalVenueManagerSchemas = SchemaFactory.createForClass(tb_general_venue_manager)