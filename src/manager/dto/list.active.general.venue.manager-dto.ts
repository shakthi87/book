import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ListActiveGeneralVenueManagerDto{
    @ApiProperty()
    search:string

    @ApiProperty()
    @IsNotEmpty()
    pageSize:number

    @ApiProperty()
    @IsNotEmpty()
    pageNumber:number

    @ApiProperty()
    field:string

    @ApiProperty()
    sortOrder:string
}
