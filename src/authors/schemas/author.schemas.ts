import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type authorDocument = HydratedDocument<tb_author>
@Schema({ timestamps: true })

export class tb_author {
    @Prop()
    authorName: string

    @Prop({ default: '1' }) //active status '1' and block status'0'
    status: string
}
export const authorSchema = SchemaFactory.createForClass(tb_author)