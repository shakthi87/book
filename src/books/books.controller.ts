import { Body, Controller,Delete,Param,Post,Get,Put, UseGuards} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create.book-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListDto } from './dto/list.book-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(
        private readonly bookService:BooksService
    ){ }

    @Post('bookCreate')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async bookCreate(@Body() createBookDto:CreateBookDto){
        return await this.bookService
        .bookCreate(createBookDto)
        .then((res)=>{
            if (res) {
                if(res.bookStatus==='1'){
                    return{
                        status:'7407',
                        message:'Title existis'
                    }
                }
                if(res.bookStatus==='2'){
                    return{
                        status:'7400',
                        message:'Success'
                    }
            }
            else{
                return{
                    status:'7407',
                    message:'Failed'
                }
                }
            }
        })
    }
    @Put('bookUpdate:bookId')
    async bookUpdate(@Param('bookId') bookId:string,@Body()createAuthorDto:CreateBookDto){
        return await this.bookService
        .bookUpdate(bookId,createAuthorDto)
        .then((res)=>{
            if(res){
                if(res.bookStatus==='1'){
                    return{
                        status:'7407',
                        message:'Author Name existis'
                    }
                }
                if(res.bookStatus==='2'){
                    return{
                        status:'7400',
                        message:'Updated'
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
    @Delete('bookRemove:bookId')
    async bookRemove(@Param('bookId') bookId:string){
        return await this.bookService
        .bookRemove(bookId)
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
    @Get('bookList:bookId')
    async bookList(@Param('bookId') bookId:string){
        return await this.bookService
        .bookList(bookId)
        .then((res)=>{
            if(res){
                return{
                    status:'7400',
                    message:'Success',
                    response:res
                }
            }
            else{
                return{
                    status:'7407',
                    message:'Failed',
                    response:null
                }
            }
        })
    }
    @Post('allBookList') 
    async allBookList(@Body()listDto:ListDto){
        return await this.bookService
        .allBookList(listDto)
        .then((res)=>{
            if(res){
                return{
                    status:'7400',
                    message:'Success',
                    response:res
                }
            }
            else{
                return{
                    status:'7407',
                    message:'Failed',
                    response:null
                }
            }
        })
    }
}    
