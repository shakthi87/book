import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema, tb_book } from './schemas/book.schemas';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports:[
        AuthModule,
        MongooseModule.forFeature([{name:tb_book.name,schema:bookSchema}])
],
providers:[BooksService],
controllers:[BooksController]

})
export class BooksModule {}
