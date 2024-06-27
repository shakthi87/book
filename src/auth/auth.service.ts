import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { tb_users_auth, usersDocument } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
import { UpdateDto } from './dto/update-dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(tb_users_auth.name)
        private userModel: Model<usersDocument>,
        private jwtService: JwtService
    ) { }
    //  async validation(email:string,password:string): Promise<any>{
    //        const user=await this.usersService.findOne(email);
    //        console.log("user",user)
    //        if(user?.password !== password){
    //         return{authStatus:'1'}
    //        }
    //        if(user && await bcrypt.compare(password,user.password)){
    //         const {password,...result}=user
    //         return {result,authStatus:'2'};
    //        }  
    //      }
    // async login(user:any){
    //     const payload ={email:user.email,sub:user._id}
    //     return{
    //         access_token:this.jwtService.sign(payload)
    //     }
    // }

    async signup(signupDto: SignupDto) {
        const isEmail = await this.userModel.findOne({ email: signupDto.email })
        if (isEmail) {
            return { userStatus: '1' }
        }
        const hash = await bcrypt.hash(signupDto.password, 10)
        const userDto = {
            name: signupDto.name,
            email: signupDto.email,
            password: hash
        }
        const newUser = await new this.userModel(userDto).save()
        return { newUser, userStatus: '2' }

    }
    async login(loginDto: LoginDto) {
        const user = await this.userModel.findOne({ email: loginDto.email, status: '1' })
        if (!user) {
            return { authStatus: '1' }
        }
        const isPassword = await bcrypt.compare(loginDto.password, user.password)
        if (!isPassword) {
            return { authStatus: '2' }
        }
        const token = this.jwtService.sign({ _id: user._id })
        return { token: token, authStatus: '3' }
    }
    async userUpdate(userId: string, updateDto: UpdateDto) {
        const isEmail = await this.userModel.findOne({ 
            _id: { $ne: userId }, 
            email: updateDto.email, 
            status: '1' })
        console.log(isEmail)
        if (isEmail) {
            return { userStatus: '1' }
        }
        
        const userDto = {
            name: updateDto.name,
            email: updateDto.email
        }
        const newUser = await this.userModel.updateOne({ _id: userId }, userDto)
        console.log("newUser",newUser)
        return { newUser, userStatus: '2' }
    }
    async userBlock(userId: string) {
        return await this.userModel.updateOne({ _id: userId }, { $set: { status: '0' } })
    }

}