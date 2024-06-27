import { Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { tb_users_auth, usersSchemas } from './schemas/user.schemas';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
          secret:config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn:config.get<string>('JWT_EXPIRES_IN')
          }
        }
      }
   }
 ),
  MongooseModule.forFeature(
    [{name:tb_users_auth.name,schema:usersSchemas}]),
],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
 
})
export class AuthModule {}
