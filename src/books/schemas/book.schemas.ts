import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  HydratedDocument } from "mongoose";

export type bookDocument = HydratedDocument<tb_book>

@Schema({ timestamps: true })
export class tb_book {
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    publishDate: Date

    @Prop()
    pageCount: number

    @Prop()
    coverImageType: string

    @Prop()
    authorId: string

    @Prop({ default: '1' }) //active status '1' and block status'0'
    status: string

}
export const bookSchema = SchemaFactory.createForClass(tb_book)