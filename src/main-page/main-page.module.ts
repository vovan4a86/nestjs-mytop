import { Module } from '@nestjs/common';
import { MainPageController } from './main-page.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { MainPageModel } from './main-page.model';

@Module({
  controllers: [MainPageController],
  imports: [
	TypegooseModule.forFeature([
		{
		typegooseClass: MainPageModel,
		schemaOptions: {
			collection: 'MainPage' //если не указать коллекцию default: MainPageModel
		}
		}
	])
  ]
})
export class MainPageModule {}
