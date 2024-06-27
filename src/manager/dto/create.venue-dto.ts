import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateVenueDto{
    @ApiProperty()
    @IsNotEmpty()
    venueImage:string[]

    @ApiProperty()
    @IsNotEmpty()
    venueName:string

    @ApiProperty()
    @IsNotEmpty()
    mobileNo:string

    @ApiProperty()
    @IsNotEmpty()
    fromAge:number

    @ApiProperty()
    @IsNotEmpty()
    toAge:number

    @ApiProperty()
    @IsNotEmpty()
    location:string

    @ApiProperty()
    @IsNotEmpty()
    category:string[]

    @ApiProperty()
    @IsNotEmpty()
    venueDescription :string

    @ApiProperty()
    @IsNotEmpty()
    venueType:string

    @ApiProperty()
    @IsNotEmpty()
    communityId:string

    @ApiProperty()
    @IsNotEmpty()
    slotType:string

    @ApiProperty()
    @IsNotEmpty()
    adultsPriceForWeekdays:number

    @ApiProperty()
    @IsNotEmpty()
    childrenPriceForWeekdays:number

    @ApiProperty()
    @IsNotEmpty()
    adultsPriceForWeekends:number

    @ApiProperty()
    @IsNotEmpty()
    childrenPriceForWeekdends:number

    @ApiProperty()
    @IsNotEmpty()
    noOfSeats:number

    @ApiProperty()
    @IsNotEmpty()
    openTime:string

    @ApiProperty()
    @IsNotEmpty()
    closeTime:string

    @ApiProperty()
    @IsNotEmpty()
    slotDuration:string

    createdAt:any


}