import { Body, Controller ,Delete,Get,Param,Post, Put, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDto } from './dto/update-dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private  authService:AuthService){}

    @Post("signup")
    async signup(@Body() signupDto:SignupDto){
        return await this.authService
        .signup(signupDto)
        .then((res)=>{
            if(res){
                if(res.userStatus==='1'){
                    return{
                        status:'7407',
                        message:'Invailed Email',
                    }
                }
                if(res.userStatus==='2'){
                    return{
                        status:'7400',
                        message:'Success',
                    }
                } 
            }
            else{
                return{
                    status:'7407',
                    message:'Failed'
                }
            }
        })
    }
    @Post("login")
    async login(@Body() loginDto:LoginDto){
        return await this.authService.login(loginDto)
        .then((res)=>{
            if(res){
                if(res.authStatus==='1'){
                    return{
                        status:'7407',
                        message:'Invailed Email',
                        token:res
                    }
                }
                if(res.authStatus==='2'){
                    return{
                        status:'7407',
                        message:'Invailed Password',
                        token:res
                    }
                }
                if(res.authStatus==='3'){
                    return{
                        status:'7400',
                        message:'Success',
                        token:res
                    } 
                }  
            }
            else{
                return{
                    status:'7407',
                    message:'Failed'
                }
            }
        })
    }
    @Put('userUpdate:userId')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async userUpdate(@Param('userId') userId:string,@Body() updateDto:UpdateDto){
        return this.authService
        .userUpdate(userId,updateDto)
        .then((res)=>{
            if(res){
                if(res.userStatus==='1'){
                    return{
                        status:'7407',
                        message:'Invailed email'
                    }
                }
                if(res.userStatus==='2'){
                    return{
                        status:'7400',
                        message:'Update'
                    }
                }
            }
            else{
                return{
                    status:'7407',
                    message:'Failed'
                }
            }
        })
    }
    @Delete('userBlock:userId')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async userBlock(@Param('userId') userId:string){
        return await this.authService
        .userBlock(userId)
        .then((res)=>{
            if(res){
                return{
                    status:'7400',
                    message:'Block'
                }
            }
            else{
                return{
                    status:'7407',
                    message:'Failed'
                }
            }
        })
    }


}
