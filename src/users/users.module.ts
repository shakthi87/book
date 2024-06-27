import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { tb_users_auth, usersSchemas } from './schemas/users.schemas';
import { UsersController } from './users.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
 
})
export class UsersModule {}
