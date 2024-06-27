import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { tb_book } from './schemas/book.schemas';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let model:Model<tb_book>

  const mockBookService={
    bookCreate:jest.fn()
  }
  let mockBook={
    
_id:'66714ce01c8aa949ee6f1c6e',
title:"test",
description:"book",
publishDate:'2024-06-18T08:41:29.044+00:00',
pageCount:40,
coverImageType:"ggg.jpg",
authorId:"6671474b4c04982a81ed6943",
status:"1"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService,
        {
          provide:getModelToken(tb_book.name),
          useValue:mockBookService
        }
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model=module.get<Model<tb_book>>(getModelToken(tb_book.name))
  });
  
  // describe('bookCreate',()=>{
  //   it('should create new book details',async ()=>{
  //     const newBook={
  //       title:"test",
  //       description:"book",
  //       publishDate:'2024-06-18T08:41:29.044+00:00',
  //       pageCount:40,
  //       coverImageType:"ggg.jpg",
  //       authorId:"6671474b4c04982a81ed6943"
  //     }
  //     jest.spyOn(model,'create').mockImplementationOnce(()=>Promise.resolve(mockBook));

  //     const result=await BooksService.create(newBook)
  //   })
  // })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
