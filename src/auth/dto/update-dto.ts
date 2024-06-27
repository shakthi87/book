import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateDto{

    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    email:string

}