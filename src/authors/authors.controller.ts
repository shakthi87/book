import { Body, Controller,Delete,Param,Post,Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create.author-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Author')
@Controller('authors')
export class AuthorsController {
    constructor(
        private readonly authorsService:AuthorsService
    ){}

    @Post('authorcreate')
    async authorcreate(@Body()createAuthorDto:CreateAuthorDto){
        return await this.authorsService
        .authorcreate(createAuthorDto)
        .then((res)=>{
            if (res) {
                if(res.authorStatus==='1'){
                    return{
                        status:'7407',
                        message:'Author Name existis'
                    }
                }
                if(res.authorStatus==='2'){
                    return{
                        status:'7400',
                        message:'Success'
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
    @Put('authorUpdate:authorId')
    async authorUpdate(@Param('authorId') authorId:string, @Body() createAuthorDto:CreateAuthorDto){
        return await this.authorsService
        .authorUpdate(authorId,createAuthorDto)
        .then((res)=>{
            if(res){
                if(res.authorStatus==='1'){
                    return{
                        status:'7407',
                        message:'Author Name existis'
                    }
                }
                if(res.authorStatus==='2'){
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
    @Delete('authorRemove:authorId')
    async authorRemove(@Param('authorId') authorId:string){
        return await this.authorsService
        .authorRemove(authorId)
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