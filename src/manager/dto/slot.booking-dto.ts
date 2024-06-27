import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBookingDto{
    @ApiProperty()
    @IsNotEmpty()
    userId:string

    @ApiProperty()
    @IsNotEmpty()
    venueId:string

    @ApiProperty()
    @IsNotEmpty()
    slotId:string

    @ApiProperty()
    @IsNotEmpty()
    userName:string

    @ApiProperty()
    @IsNotEmpty()
    mobileNo:string

    @ApiProperty()
    @IsNotEmpty()
    profile:string

    @ApiProperty()
    @IsNotEmpty()
    bookedBy:string
    
}