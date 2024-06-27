import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { authorSchema, tb_author } from './schemas/author.schemas';

@Module({
  imports:[MongooseModule.forFeature([{name:tb_author.name,schema:authorSchema}])],
  controllers: [AuthorsController],
  providers: [AuthorsService]
})
export class AuthorsModule {}
