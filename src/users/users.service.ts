import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { tb_users_auth, usersDocument } from './schemas/users.schemas';
// import { Model } from 'mongoose';
// import { CreateUserDto } from './dto/create.user-dto';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    // constructor(
    //     @InjectModel(tb_users_auth.name) private userSModule:Model <usersDocument>,
    //     private jwtService:JwtService)
    // {}
    // async createUser(createUserDto:CreateUserDto){
    //     const isEmail=await this.userSModule.findOne({email:createUserDto.email})
    //     if(isEmail){
    //         return{userStatus:'1'}
    //     }
    //     const hash= await bcrypt.hash(createUserDto.password,10)
    //     const userDto={
    //         email:createUserDto.email,
    //         password:hash
    //     }
    //     const newUser= await new this.userSModule(userDto).save()
    //     return{newUser,userStatus:'2'}
    // }
    // async findOne(email:string){
    //     const existing =await this.userSModule.findOne({email:email,status:'1'})
    //     console.log("existing",existing)
    //     return existing 
    //     // if(existing){
    //     //     const isMatch= await bcrypt.compare(createUserDto.password,existing.password,()=>{
               
    //     //         const payload={sub:existing._id,email:existing.email}
    //     //         console.log("payload",payload)
    //     //             return{
    //     //                 access_token:  this.jwtService.signAsync(payload)
    //     //                 ,userStatus:"2"}
    //     //         }
              
    //     //     )
    //     //     console.log("IsMatch",isMatch)
    //     // }
        
    // }
    // async userDetails(userId:string){

    // }
    // async blockUser(userId:string){

    // }
    // async unBlockUser(userId:string){

    // }
   

        
    
}
