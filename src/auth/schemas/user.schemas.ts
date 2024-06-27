import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type usersDocument=HydratedDocument<tb_users_auth>
@Schema({timestamps:true})
export class tb_users_auth{
    @Prop()
    name:string
    
    @Prop()
    email:string

    @Prop()
    password:string

    @Prop({default:'1'})
    status:string
}

export const usersSchemas=SchemaFactory.createForClass(tb_users_auth)