import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { generalVenueManagerDocument, tb_general_venue_manager } from './schemas/general.venue.manager.schemas.ts';
import { tb_user, userDocument } from './schemas/user.schemas';
import { Model, Types } from 'mongoose';
import { ListActiveGeneralVenueManagerDto } from './dto/list.active.general.venue.manager-dto.js';
import { CreateUserDto } from './dto/create.user-dto.js';
import { ListUserDto } from './dto/list.user-dto.js';
import { AddUserDto } from './dto/add.user-dto.js';
import { VenueSlotDto } from './dto/venue.slot-dto.js';
import * as moment from 'moment';
import { slotDocument, tb_slot } from './schemas/slot.schema.js';
import { tb_venue, venueDocument } from './schemas/venue.schema.js';
import { bookingDocument, tb_booking } from './schemas/booking.schema.js';
import { communityDocument, tb_community } from './schemas/community.schema.js';
import { communityDetailDocument, tb_community_detail } from './schemas/community.details.schema.js';
import { CreateVenueDto } from './dto/create.venue-dto.js';
import { generalDetailsDocument, tb_general_details } from './schemas/general.details.schema.js';
import { CreateBookingDto } from './dto/slot.booking-dto.js';

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(tb_general_venue_manager.name) private generalVenueManagerModule: Model<generalVenueManagerDocument>,
        @InjectModel(tb_user.name) private userModule: Model<userDocument>,
        @InjectModel(tb_slot.name) private slotModule: Model<slotDocument>,
        @InjectModel(tb_venue.name) private venueModule: Model<venueDocument>,
        @InjectModel(tb_booking.name) private bookingModule: Model<bookingDocument>,
        @InjectModel(tb_community.name) private communtiyModule: Model<communityDocument>,
        @InjectModel(tb_community_detail.name) private communityDetailsModule: Model<communityDetailDocument>,
        @InjectModel(tb_general_details.name) private generalDetailsModule: Model<generalDetailsDocument>
    ) { }

    async generalVenueManagerActiveList(listActiveGeneralVenueManagerDto: ListActiveGeneralVenueManagerDto) {
        let search: any = {
            $and: [
                { status: '1' }
            ]
        }
        if (listActiveGeneralVenueManagerDto.search && listActiveGeneralVenueManagerDto.search != "") {
            search['$and'].push({
                $or: [
                    { userName: { $regex: listActiveGeneralVenueManagerDto.search, $options: 'i' } },
                    { mobileNo: { $regex: listActiveGeneralVenueManagerDto.search, $options: 'i' } }
                ]
            })
        }

        let order = {}
        if (listActiveGeneralVenueManagerDto.field && listActiveGeneralVenueManagerDto.field != '') {
            order[listActiveGeneralVenueManagerDto.field] = listActiveGeneralVenueManagerDto.sortOrder === 'asc' ? 1 : -1;
        }
        else {
            order[`createAt`] = listActiveGeneralVenueManagerDto.sortOrder === 'asc' ? 1 : -1;
        }

        const limit =
            (listActiveGeneralVenueManagerDto.pageNumber * listActiveGeneralVenueManagerDto.pageSize)
            - listActiveGeneralVenueManagerDto.pageSize

        const response = await this.generalVenueManagerModule.aggregate(
            [
                {
                    $project: {
                        userName: 1,
                        mobileNo: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $match: search
                },
                {
                    $sort: order
                },
                {
                    $skip: limit
                },
                {
                    $limit: listActiveGeneralVenueManagerDto.pageSize
                }
            ]
        )
        const responseLength = await this.generalVenueManagerModule.aggregate(
            [
                {
                    $project: {
                        userName: 1,
                        mobileNo: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $match: search
                },
                {
                    $sort: order
                },
                {
                    $count: 'total'

                }
            ]
        )
        return {
            response,
            length: responseLength.length > 0 ? responseLength[0].total : 0

        }
    }

    async generalVenueManagerRemove(generalVenueManagerId: string) {
        return await this.generalVenueManagerModule.updateOne({ _id: generalVenueManagerId }, { $set: { status: '0' } })
    }

    async addManager(addUserDto: AddUserDto) {
        const findUser = await this.userModule.findOne({ _id: addUserDto.userId })
        const userDto = {
            profile: findUser.profile,
            userName: findUser.userName,
            mobileNo: findUser.mobileNo,
            userId: findUser._id,
            venueId: addUserDto.venueId
        }
        const isManager = await this.generalVenueManagerModule.findOne({ userId: userDto.userId, venueId: userDto.venueId })
        if (isManager) {
            return { userStatus: '1' }
        }
        const addManager = await new this.generalVenueManagerModule(userDto).save()
        return { userStatus: '2' }
    }

    async createUser(createUserDto: CreateUserDto) {
        const isMobile = await this.userModule.findOne({ mobileNo: createUserDto.mobileNo })
        if (isMobile) {
            return { userStatus: '1' }
        }
        const user = await new this.userModule(createUserDto).save()
        return { userStatus: '2' }
    }

    async userList(venueId: string, listUserDto: ListUserDto) {
        const user = await this.generalVenueManagerModule.find({ venueId: venueId }).select({ _id: 0, userId: 1 })
        let result = []
        const dd = user.map((x) => {
            result.push(x.userId)
        })

        let userlist: any = {
            $and: [
                { _id: { $nin: result } }
            ]
        }


        let search: any = {
            $and: [
                { status: '1' }
            ]
        }
        if (listUserDto.search && listUserDto.search != "") {
            search["$and"].push({
                $or: [
                    { mobileNo: { $regex: listUserDto.search, $options: 'i' } }
                ]
            })
        }

        let order: any = {}
        if (listUserDto.field && listUserDto.field != '') {
            order[listUserDto.field] = listUserDto.sortOrder === 'asc' ? 1 : -1;
        }
        else {
            order[`createAt`] = listUserDto.sortOrder === 'asc' ? 1 : -1;
        }

        const limit = (listUserDto.pageNumber * listUserDto.pageSize) - listUserDto.pageSize

        const response = await this.userModule.find(userlist)
            .find(search)
            .sort(order)
            .skip(limit)
            .limit(listUserDto.pageSize)
        const responseLength = await this.userModule.find(userlist)
            .find(search)
            .countDocuments()
        return {
            response,
            length: responseLength
        }
    }
    async generalVenueManagerUnRemove(generalVenueManagerId: string) {
        return await this.generalVenueManagerModule.updateOne({ _id: generalVenueManagerId }, { $set: { status: '1' } })
    }
    async userListA(venueId: string) {
        const userList = await this.generalVenueManagerModule.aggregate([
            {
                $match: { venueId: venueId }
            },
            {
                $lookup: {
                    from: "tb_user",
                    let: { userId: "$userId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $nin: ['$_id', "$$userId"]
                                }
                            }
                        }, {
                            $project: {
                                _id: 1,
                                userId: 1
                            }
                        }
                    ], as: "user"
                }
            }, {
                $project: {
                    _id: 0,
                    userName: 1,
                    mobileNo: 1
                }
            }
        ])
        return userList
    }
    async createSlot(venueSlotDto: VenueSlotDto) {

        const Datamoment = moment(venueSlotDto.slotDate)

        const startTimeMoment = moment(venueSlotDto.startTime)

        const endTimeMoment = moment(venueSlotDto.EndTime)

        // const slot= await this.venueModule.findOne({_id:venueSlotDto.venueId})
        // let startTime=moment(slot.openTime,"HH:mm a")
        // let endTime=moment(slot.closeTime,"HH:mm a").add(1,'days')
        // const allTimes=[]
        // while(startTime<endTime){
        //     allTimes.push(startTime.format('HH:mm a'))
        //     startTime.add(slot.slotDuration)
        // }

        const slotDto = {
            startTime: startTimeMoment,
            EndTime: endTimeMoment,
            slotDate: Datamoment,
            venueId: venueSlotDto.venueId
        }
        return await new this.slotModule(slotDto).save()

    }
    async createVenue(createVenueDto: CreateVenueDto) {

        const venueDto = {
            venueImage: createVenueDto.venueImage,
            venueName: createVenueDto.venueName,
            mobileNo: createVenueDto.mobileNo,
            fromAge: createVenueDto.fromAge,
            toAge: createVenueDto.toAge,
            location: createVenueDto.location,
            category: createVenueDto.category,
            venueDescription: createVenueDto.venueDescription,
            venueType: createVenueDto.venueType,
            openTime: createVenueDto.openTime,
            closeTime: createVenueDto.closeTime,
            slotDuration: createVenueDto.slotDuration

        }
        const isVenueName = await this.venueModule.findOne({ venueName: createVenueDto.venueName })
        if (isVenueName) {
            return { venueStatus: '1' }
        }
        const isMobile = await this.venueModule.findOne({ mobileNo: createVenueDto.mobileNo })
        if (isMobile) {
            return { venueStatus: '2' }
        }
        const futureDays = moment(createVenueDto.createdAt)
        for (var i = 0; i < 7; i++) {
            futureDays.add(1, 'd')
        }
        const venue = await new this.venueModule(venueDto).save()

        let generalDto = {
            venueId: venue._id,
            slotType: createVenueDto.slotType,
            adultsPriceForWeekdays: createVenueDto.adultsPriceForWeekdays,
            childrenPriceForWeekdays: createVenueDto.childrenPriceForWeekdays,
            adultsPriceForWeekends: createVenueDto.adultsPriceForWeekends,
            childrenPriceForWeekdends: createVenueDto.childrenPriceForWeekdends,
            noOfSeats: createVenueDto.noOfSeats,

        }
        if (createVenueDto.venueType === 'general') {
            const general = await new this.generalDetailsModule(generalDto).save()
            return { venueStatus: '3' }
        }
        let communityDto = {
            venueId: venue._id,
            communityId: createVenueDto.communityId
        }

        if (createVenueDto.venueType === 'community') {
            const community = await new this.communityDetailsModule(communityDto).save()
          //console.log("ans:", community)
            return { venueStatus: '3' }
        }
        return { venueStatus: '3' }
    }
    async createBooking(createBookingDto: CreateBookingDto) {
        const booking = await new this.bookingModule(createBookingDto).save()
        return booking
    }
    async listuser(userId: string, listUserDto: ListUserDto) {
    
        let search: any = {
            $and: [
                { status: '1' }
            ]
        }
        if (listUserDto.search && listUserDto.search != "") {
            search['$and'].push({
                $or: [
                    { userName: { $regex: listUserDto.search, $options: 'i' } },
                    { mobileNo: { $regex: listUserDto.search, $options: 'i' } }
                ]
            })
        }
        let order = {}
        if (listUserDto.field && listUserDto.field != '') {
            order[listUserDto.field] = listUserDto.sortOrder === 'asc' ? 1 : -1;
        }
        else {
            order[`createAt`] = listUserDto.sortOrder === 'asc' ? 1 : -1;
        }

        const limit =
            (listUserDto.pageNumber * listUserDto.pageSize) - listUserDto.pageSize

        const response = await this.bookingModule.aggregate(
            [
                {
                    $match: { userId: new Types.ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: "tb_venues",
                        let: { venueId: "$venueId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$venueId"] }
                                        ]
                                    }
                                }
                            }
                        ], as: "venue"
                    }
                },
                {
                    $lookup: {
                        from: "tb_slots",
                        let: { slotId: "$slotId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$slotId"] }
                                        ]
                                    }
                                }
                            }
                        ], as: "slot"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        userName: 1,
                        mobileNo: 1,
                        profile: 1,
                        bookedBy: 1,
                        venueImage: { $arrayElemAt: ["$venue.venueImage", 0] },
                        venueName: { $arrayElemAt: ["$venue.venueName", 0] },
                        VenueMobileNo: { $arrayElemAt: ["$venue.mobileNo", 0] },
                        fromAge: { $arrayElemAt: ["$venue.fromAge", 0] },
                        toAge: { $arrayElemAt: ["$venue.toAge", 0] },
                        location: { $arrayElemAt: ["$venue.location", 0] },
                        category: { $arrayElemAt: ["$venue.category", 0] },
                        venueDescription: { $arrayElemAt: ["$venue.venueDescription", 0] },
                        venueType: { $arrayElemAt: ["$venue.venueType", 0] },
                        slotStartTime: { $arrayElemAt: ["$slot.startTime", 0] },
                        slotEndTime: { $arrayElemAt: ["$slot.endTime", 0] },
                        slotDate: {$arrayElemAt: ["$slot.slotDate", 0] },
                        status:1
                    }
                },
                {
                    $match: search
                },
                {
                    $sort: order
                },
                {
                    $skip: limit
                },
                {
                    $limit: listUserDto.pageSize
                },
            ]
        )
        const responseLength = await this.bookingModule.aggregate(
            [
                {
                    $match: { userId: new Types.ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: "tb_venues",
                        let: { venueId: "$venueId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$venueId"] }
                                        ]
                                    }
                                }
                            }
                        ], as: "venue"
                    }
                },
                {
                    $lookup: {
                        from: "tb_slots",
                        let: { slotId: "$slotId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$slotId"] }
                                        ]
                                    }
                                }
                            }
                        ], as: "slot"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        userName: 1,
                        mobileNo: 1,
                        profile: 1,
                        bookedBy: 1,
                        venueImage: { $arrayElemAt: ["$venue.venueImage", 0] },
                        venueName: { $arrayElemAt: ["$venue.venueName", 0] },
                        VenueMobileNo: { $arrayElemAt: ["$venue.mobileNo", 0] },
                        fromAge: { $arrayElemAt: ["$venue.fromAge", 0] },
                        toAge: { $arrayElemAt: ["$venue.toAge", 0] },
                        location: { $arrayElemAt: ["$venue.location", 0] },
                        category: { $arrayElemAt: ["$venue.category", 0] },
                        venueDescription: { $arrayElemAt: ["$venue.venueDescription", 0] },
                        venueType: { $arrayElemAt: ["$venue.venueType", 0] },
                        slotStartTime: { $arrayElemAt: ["$slot.startTime", 0] },
                        slotEndTime: { $arrayElemAt: ["$slot.endTime", 0] },
                        slotDate: { $arrayElemAt: ["$slot.slotDate", 0] },
                        status:1
                    }
                },
                {
                    $match: search
                },
                {
                    $sort: order
                },
                {
                    $count: 'total'
                }
            ]
        )

        return {
            response,
            length: responseLength.length > 0 ? responseLength[0].total : 0
        }

    }

    async slotinterval(){
        const isStatus=await this.venueModule.find({status:'1'})
        console.log("isStatus",isStatus)
        for(const res of isStatus ){
            const createTime=moment(res.createAt.toString())
        }
    }




}