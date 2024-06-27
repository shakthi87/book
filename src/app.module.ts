import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CronJobModule } from './cron-job/cron-job.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://mshakthi2018mb115:Ow5difMQYWHhildh@cluster0.279anab.mongodb.net/db_book'),
   BooksModule,
   AuthorsModule, 
   ManagerModule, 
   AuthModule, 
   UsersModule,
   CronJobModule,
   ScheduleModule.forRoot(),
   ConfigModule.forRoot({
    isGlobal: true,
  }),
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
