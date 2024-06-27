import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddUserDto{

    @ApiProperty()
    @IsNotEmpty()
    userId:string

    @ApiProperty()
    @IsNotEmpty()
    venueId:string
}
