import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

//https://github.com/typestack/class-validator

enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

class HhDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class MainPageAdvantageDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateMainPageDto {

	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()	//если свойства нет, то можно пропустить
	@ValidateNested() //валидация внутри объекта
	@Type(() => HhDataDto)
	hh?: HhDataDto;

	@IsArray()
	@ValidateNested() //зайти внутрь массива и провалидировать объекты внутри
	@Type(() => MainPageAdvantageDto) //указать тип внутренних объектов
	advantages: MainPageAdvantageDto[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({each: true})//каждый элемент внутри массива - строка
	tags: string[];
}
