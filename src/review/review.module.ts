import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { ReviewModel } from "./review.model";

@Module({
  controllers: [ReviewController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: 'Review' //если не указать коллекцию default: ReviewModel
        }
      }
    ])
  ]
})
export class ReviewModule {}
