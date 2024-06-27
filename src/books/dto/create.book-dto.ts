import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateBookDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    authorId: string

    @ApiProperty()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    publishDate: Date

    @ApiProperty()
    @IsNotEmpty()
    pageCount: number

    @ApiProperty()
    @IsNotEmpty()
    coverImageType: string


}