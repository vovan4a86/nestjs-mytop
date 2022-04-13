import { Module } from '@nestjs/common';
import { MainPageController } from './main-page.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { MainPageModel } from './main-page.model';
import { MainPageService } from './main-page.service';

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
  ],
  providers: [MainPageService]
})
export class MainPageModule {}
