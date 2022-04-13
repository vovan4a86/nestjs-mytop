import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { MainPageModel, TopLevelCategory } from './main-page.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateMainPageDto } from './dto/create-main-page.dto';

@Injectable()
export class MainPageService {
	constructor(@InjectModel(MainPageModel) private readonly mainPageModel: ModelType<MainPageModel>) {
	}

	async create(dto: CreateMainPageDto): Promise<DocumentType<MainPageModel>> {
		// @ts-ignore
		return this.mainPageModel.create(dto);
	}

	async findById(id: string): Promise<DocumentType<MainPageModel> | null> {
		return this.mainPageModel.findById(id).exec();
	}

	async findByAlias(alias: string): Promise<DocumentType<MainPageModel> | null> {
		return this.mainPageModel.findOne({ alias }).exec();
	}

	async findByTopLevelCategory(firstCategory: TopLevelCategory): Promise<DocumentType<MainPageModel>[]>  {
		//возвращает не всю модель, а только указанные в projection 1-true
		// return this.mainPageModel.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec();

		return this.mainPageModel.aggregate()
			.match({
				firstCategory
			})
			.group({
				_id: { secondCategory: '$secondCategory' }, //РАЗРАБОТКА
				//в массиве pages буду все элементы принадлежащие secondCategory
				pages: { $push: { alias: '$alias', title: '$title' } }	//javascript, Курсы по JS
			})
			.exec();
	}

	async findByText(text: string) {
		return this.mainPageModel.find({ $text: { $search: text, $caseSensitive: false} }).exec();
	}

	async deleteById(id: string): Promise<DocumentType<MainPageModel> | null> {
		return this.mainPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateMainPageDto) {
		//без дополнительных опций все Update возвращают предыдущую версию документа
		//new: true - возвратит обновленную
		//Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`
		// option set to false are deprecated.
		return this.mainPageModel.findByIdAndUpdate(id, dto, { new: true, useFindAndModify: false }).exec();
	}




}
