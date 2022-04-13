import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

//https://github.com/typestack/class-validator

class ProductCharacteristicDto {
	@IsString()
	name: string;
	@IsString()
	value: string;
}

export class CreateProductDto {
	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsNumber()
	price: number;

	@IsOptional() //если свойства нет, то можно пропустить
	@IsNumber()
	oldPrice?: number;

	@IsNumber()
	credit: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;

	@IsArray()
	@IsString({ each: true }) //каждый элемент внутри массива - строка
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsArray()
	@ValidateNested() //зайти внутрь массива и провалидировать объекты внутри
	@Type(() => ProductCharacteristicDto) //указать тип внутренних объектов
	characteristics: ProductCharacteristicDto[];
}
