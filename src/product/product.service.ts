import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/review.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {
	}

	async create(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
		// @ts-ignore
		return this.productModel.create(dto);
	}

	async findById(id: string): Promise<DocumentType<ProductModel> | null> {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string): Promise<DocumentType<ProductModel> | null> {
		return this.productModel.findByIdAndDelete(id).exec();
	}
	async updateById(id: string, dto: CreateProductDto) {
		//без дополнительных опций все Update возвращают предыдущую версию документа
		//new: true - возвратит обновленную
		//Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`
		// option set to false are deprecated.
		return this.productModel.findByIdAndUpdate(id, dto, { new: true, useFindAndModify: false }).exec();
	}

	//агрегация данных
	//https://www.mongodb.com/docs/v4.4/reference/operator/aggregation/
	async findWithReviews(dto: FindProductDto) {
		//последовательные шаги (Stages), которые в конце выдадут финальную модель
		return this.productModel.aggregate([
			{
				$match: {
					categories: dto.category
				}
			},
			{
				$sort: {
					_id: 1	//стабильная сортировка по _id
				}
			},
			{
				$limit: dto.limit
			},
			{
				//подтягиваем данные из другой коллекции
				$lookup: {
					from: 'Review',
					localField: '_id',
					foreignField: 'productId',
					as: 'reviews'
				}
			},
			{
				$addFields: {
					reviewCount: { $size: '$reviews' },
					reviewAvg: { $avg: '$reviews.rating' },
					//свои функции только в Mongo 4.4 и выше
					reviews: {
						//сортировка отзывов по дате от самых новых
						$function: {
							body: `function (reviews) {
								reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								return reviews;
							}`,
							args: ['$reviews'],
							lang: 'js'
						}
					}
				}
			}
		]).exec() as (ProductModel & { review: ReviewModel[], reviewCount: number, reviewAvg: number})[];
	}


}
