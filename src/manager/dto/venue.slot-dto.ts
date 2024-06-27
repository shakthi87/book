import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VenueSlotDto{
    @ApiProperty()
    @IsNotEmpty()
    startTime:Date

    @ApiProperty()
    @IsNotEmpty()
    EndTime:Date

    @ApiProperty()
    @IsNotEmpty()
    slotDate:Date

    @ApiProperty()
    @IsNotEmpty()
    venueId:string

}