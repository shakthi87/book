import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { tb_users_auth, usersDocument } from "./schemas/user.schemas";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(tb_users_auth.name)
        private userModel:Model<usersDocument>
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET,
        })
    }
    async validate(payload){
        const{_id}=payload

        const user = await this.userModel.findById(payload._id);
        if(!user){
            throw new UnauthorizedException('Login first to access this endpoint')
        }
        return user
    }
}