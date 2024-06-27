import { Body, Controller,Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user-dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
    // constructor(private readonly usersService:UsersService){}
    // @Post("createUser")
    // async createUser(@Body()createUserDto:CreateUserDto){
    //     return await this.usersService
    //     .createUser(createUserDto)
    //     .then((res)=>{
    //         if(res){
    //             if(res.userStatus==='1'){
    //                 return{
    //                     status:"7407",
    //                     message:"User Existis"
    //                 }
    //             }
    //             if(res.userStatus==='2'){
    //                 return{
    //                     status:"7400",
    //                     message:'Success'
    //                 }
    //             }
    //         }
    //         else{
    //             return{
    //                 status:'7407',
    //                 message:'Failed'
    //             }
    //         }
    //     })
    // }
    // @Post("loginUser")
    // async loginUser(@Body() :CreateUserDto){
    //     return await this.usersService
    //     .findOne(email)
    //     .then((res)=>{
    //         if(res){
    //             if(res.userStatus==='1'){
    //                 return{
    //                     status:"7407",
    //                     message:"user doesn't existis" 
    //                 }
    //             }
    //             if(res.userStatus==='2'){
    //                 return{
    //                     status:'7400',
    //                     message:'Login'
    //                 }
    //             }
    //         }
    //         else{
    //             return{
    //                 status:"7407",
    //                 message:'Failed'
    //             }
    //         }
    //     })
    // }
}
