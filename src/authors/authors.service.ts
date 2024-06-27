import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { authorDocument, tb_author } from './schemas/author.schemas';
import { Model, Types } from 'mongoose';
import { CreateAuthorDto } from './dto/create.author-dto';
@Injectable()
export class AuthorsService {
    constructor(     
        @InjectModel(tb_author.name)private authorModule:Model<authorDocument> ,
       
    ){}
    
    async authorcreate(createAuthorDto:CreateAuthorDto){
        const isAuthorName=await this.authorModule.findOne({authorName:createAuthorDto.authorName})
        if(isAuthorName){
            return{authorStatus:'1'}
        }
        const author=await new this.authorModule(createAuthorDto).save()
        return{ authorStatus:'2'}
    }

    async authorUpdate( authorId: string ,createAuthorDto:CreateAuthorDto){
        const isAuthorName = await this.authorModule.findOne({ _id: { $ne: authorId }, authorName: createAuthorDto.authorName, status: '1' })
        if (isAuthorName) {
            return { authorStatus: '1' }
        }
        const updateAuthor=await this.authorModule.updateOne({_id:authorId},createAuthorDto)
        return{ ...updateAuthor,
                   authorStatus:'2'
        }
    }

    async authorRemove(authorId:string){
        const block = await this.authorModule.updateOne({ _id: authorId }, { $set: { status: '0' } })
        return { ...block }
    }

  
    


}
