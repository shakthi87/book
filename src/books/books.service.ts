import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { bookDocument, tb_book } from './schemas/book.schemas';
import { CreateBookDto } from './dto/create.book-dto';
import { Model, Types } from 'mongoose';
import { ListDto } from './dto/list.book-dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(tb_book.name) private bookModule: Model<bookDocument>
    ) { }
    async bookCreate(createBookDto: CreateBookDto) {
        const bookdto = {
            title: createBookDto.title,
            authorId: createBookDto.authorId,
            description: createBookDto.description,
            publishDate: createBookDto.publishDate,
            pageCount: createBookDto.pageCount,
            coverImageType: createBookDto.coverImageType
        }
        const isTitle = await this.bookModule.findOne({ title: createBookDto.title })
        if (isTitle) {
            return { bookStatus: '1' }
        }
        const book = await new this.bookModule(bookdto).save()
        return {
            bookStatus: '2'
        }
    }
    async bookUpdate(bookId: string, createBookDto: CreateBookDto) {
        const isTitle = await this.bookModule.findOne({ _id: { $ne: bookId }, title: createBookDto.title, status: '1' })
        if (isTitle) {
            return { bookStatus: '1' }
        }
        const updateBook = await this.bookModule.updateOne({ _id: bookId }, createBookDto)
        return {
            ...updateBook,
            bookStatus: '2'
        }
    }
    async bookRemove(bookId: string) {
        const block = await this.bookModule.updateOne({ _id: bookId }, { $set: { status: '0' } })
        return { ...block }
    }
    async bookList(bookId: string) {
        const response = await this.bookModule.aggregate(
            [
                {
                    $match: {
                        _id: new Types.ObjectId(bookId)
                    }
                },
                {
                    $lookup: {
                        from: "tb_authors",
                        let: { authorId: "$authorId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$authorId"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "author"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        publicDate: 1,
                        pageCount: 1,
                        description: 1,
                        authorName: { '$arrayElemAt': ["$author.authorName", 0] }
                    }
                }
            ]
        )
        return response[0]
    }
    async allBookList(listDto: ListDto) {
        let search:any = {
            $and:[
                {status:'1'}
            ]
        } 
        if (listDto.search && listDto.search != "") {
            search={
                $or: [
                { title: { $regex: listDto.search, $options:'i' } }
                ]
            }
        }
        // // let sort: any = {
        // //     $and: [
        // //         { status: '1' }
        // //     ]
        // // }
        let order = {}
        if (listDto.field && listDto.field != '') {
            order[listDto.field] = listDto.sortOrder === 'asc' ? 1 : -1;
        } else {
            order[`createAt`] = listDto.sortOrder === 'asc' ? 1 : -1;
        }
        const limit = (listDto.pageNumber * listDto.pageSize) - listDto.pageSize
        const response = await this.bookModule.aggregate(
            [
                {
                    $lookup: {
                        from: "tb_authors",
                        let: { authorId: "$authorId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$authorId"] }

                                        ]
                                    }
                                }
                            },
                            //{
                            //     $group:{
                            //         count:{}
                            //     }
                            // }
                        ], as: "author"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        authorName: { $arrayElemAt: ["$author.authorName", 0] },
                        status:1
                    }
                },
                {
                    $match: search
                },
                {
                    $sort: order
                },
                {
                    $skip: limit
                },
                {
                    $limit: listDto.pageSize
                },
            ]
        )
        const responseLength = await this.bookModule.aggregate(
            [
                {
                    $lookup: {
                        from: "tb_authors",
                        let: { authorId: "$authorId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$authorId"] }
                                        ]
                                    }
                                }
                            }
                        ], as: "author"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        authorName: { $arrayElemAt: ["$author.authorName", 0] },
                        status:1
                    }
                },
                {
                    $match: search
                },
                {
                    $sort: order
                },
                {
                    $count: 'total'
                }
            ]
        )
        console.log("response", response)
        return {
            response: response,
            length: responseLength.length > 0 ? responseLength[0].total : 0
        }
    }



}
