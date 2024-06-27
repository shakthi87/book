import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, Types } from "mongoose";

export type communityDetailDocument=HydratedDocument<tb_community_detail>

@Schema({timestamps:true})

export class tb_community_detail{

    @Prop({type:Types.ObjectId})
    venueId:string

    @Prop({type:Types.ObjectId})
    communityId:string

    @Prop({default:'1'})//active status '1' and block status'0'
    status: string

}
export const communityDetailSchema=SchemaFactory.createForClass(tb_community_detail)