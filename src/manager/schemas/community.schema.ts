import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type communityDocument=HydratedDocument<tb_community>

@Schema({timestamps:true})
export class tb_community{
    @Prop()
    communityName:string

    @Prop()
    address:string

    @Prop()
    area:string

    @Prop()
    city:string

    @Prop()
    pincode:number

    @Prop({default:'1'})//active status '1' and block status'0'
    status: string

}
export const communitySchema=SchemaFactory.createForClass(tb_community)