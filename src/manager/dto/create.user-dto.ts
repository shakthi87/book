import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    profile:string

    @ApiProperty()
    @IsNotEmpty()
    userName:string

    @ApiProperty({maximum:10})
    @IsNotEmpty()
    mobileNo:string

    
}