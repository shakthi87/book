import { Body, Controller, Delete, Param, Post, Get, Put } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ListActiveGeneralVenueManagerDto } from './dto/list.active.general.venue.manager-dto';
import { CreateUserDto } from './dto/create.user-dto';
import { ApiTags } from '@nestjs/swagger';
import { ListUserDto } from './dto/list.user-dto';
import { AddUserDto } from './dto/add.user-dto';
import { VenueSlotDto } from './dto/venue.slot-dto';
import { CreateVenueDto } from './dto/create.venue-dto';
import { CreateBookingDto } from './dto/slot.booking-dto';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
    constructor(
        private readonly managerService: ManagerService
    ) { }
    @Post('generalVenueManagerActiveList')
    async generalVenueManagerActiveList(@Body() listActiveGeneralVenueManagerDto: ListActiveGeneralVenueManagerDto) {
        return await this.managerService
            .generalVenueManagerActiveList(listActiveGeneralVenueManagerDto)
            .then((res) => {
                if (res) {
                    return {
                        status: '7400',
                        message: 'success',
                        response: res
                    }
                }
                else {
                    return {
                        status: '7407',
                        message: 'Failed',
                        response: null
                    }
                }
            })
    }
    @Delete('generalVenueManagerRemove:generalVenueManagerId')
    async generalVenueManagerRemove(@Param('generalVenueManagerId') generalVenueManagerId: string) {
        return await this.managerService
            .generalVenueManagerRemove(generalVenueManagerId)
            .then((res) => {
                if (res) {
                    return {
                        status: '7400',
                        message: 'Block'
                    }
                }
                else {
                    return {
                        status: '7407',
                        message: 'Failed'
                    }
                }
            })
    }
    @Post('addManager')
    async addManager(@Body() addUserDto: AddUserDto) {
        return await this.managerService
            .addManager(addUserDto)
            .then((res) => {
                if (res) {
                    if (res.userStatus === '1') {
                        return {
                            status: '7407',
                            message: 'Manager Already existis'
                        }
                    }
                    if (res.userStatus === '2') {
                        return {
                            status: '7400',
                            message: 'Added'
                        }
                    }
                }
                else {
                    return {
                        status: '7407',
                        message: 'Failed'
                    }
                }
            })
    }

    @Post('createUser')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.managerService
            .createUser(createUserDto)
            .then((res) => {
                if (res) {
                    if (res.userStatus === '1') {
                        return {
                            status: '7407',
                            message: 'Mobile No. existis'
                        }
                    }
                    if (res.userStatus === '2') {
                        return {
                            status: '7400',
                            message: 'Success'
                        }
                    }
                }
                else {
                    return {
                        status: '7407',
                        message: 'Failed'
                    }
                }
            }
            )
    }
    @Post('userList:venueId')
    async userList(@Param('venueId') venueId: string, @Body() listUserDto: ListUserDto) {
        return await this.managerService
            .userList(venueId, listUserDto)
            .then((res) => {
                if (res) {
                    return {
                        status: '7400',
                        message: 'Success',
                        response: res
                    }
                }
                else {
                    return {
                        status: '7407',
                        message: 'Failed',
                        response: null
                    }
                }
            }
            )
    }
    @Put('generalVenueManagerUnRemove:generalVenueManagerId')
    async generalVenueManagerUnRemove(@Param("generalVenueManagerId") generalVenueManagerId: string) {
        return await this.managerService
            .generalVenueManagerUnRemove(generalVenueManagerId)
            .then((res) => {
                if (res) {
                    return {
                        status: '7400',
                        message: 'UnBlock'
                    }
                }
                else {
                    return {
                        status: '7407',
                        message: 'Failed'
                    }
                }
            }
            )
    }
    @Post('userListA:venueId')
    async userListA(@Param('venueId') venueId: string) {
        return await this.managerService
            .userListA(venueId)
            .then((res) => {
                if (res) {
                    return {
                        status: '7400',
                        message: 'Success',
                        response: res
                    }
                } else {
                    return {
                        status: '7407',
                        message: 'Failed',
                        response: null
                    }
                }
            }
            )
    }
    @Post('createSlot')
    async createSlot(@Body() venueSlotDto: VenueSlotDto) {
        return await this.managerService
            .createSlot(venueSlotDto)
            .then((res) => {
                if (res) {
                    return {
                        status: '7400',
                        message: 'Success'
                    }
                }
                else {
                    return {
                        status: '7407',
                        message: 'Failed'
                    }
                }
            }
            )
    }
    @Post('createVenue')
    async createVenue(@Body() createVenueDto: CreateVenueDto) {
        return await this.managerService
            .createVenue(createVenueDto)
            .then((res) => {
                if (res) {
                    if (res.venueStatus === '1') {
                        return {
                            status: '7407',
                            message: 'Venue Name Existis'
                        }
                    }
                    if (res.venueStatus === '2') {
                        return {
                            status: '7407',
                            message: 'Mobile No. Existis'
                        }
                    }
                    if (res.venueStatus === '3') {
                        return {
                            status: '7400',
                            message: 'Success'
                        }
                    }

                }
                else {
                    return {
                        status: '7407',
                        message: 'Failed'
                    }
                }

            }
            )
    }
    @Post("createBooking")
    async createBooking(@Body() createBookingDto: CreateBookingDto) {
        return await this.managerService
            .createBooking(createBookingDto)
            .then((res) => {
                if (res) {
                    return {
                        status: "7400",
                        message: "Success"
                    }
                }
                else {
                    return {
                        status: "7407",
                        message: "Failed"
                    }
                }
            })
    }
    @Post('listuser:userId')
    async listuser(@Param('userId')userId:string ,@Body()listUserDto:ListUserDto){
        return await this.managerService
        .listuser(userId,listUserDto)
        .then((res)=>{
            if(res){
                return{
                    status:"7400",
                    message:"Success",
                    response:res
                }
            }
            else{
                return{
                    status:'7404',
                    message:'Failed',
                    response:null
                }
            }
        })
    }
}


