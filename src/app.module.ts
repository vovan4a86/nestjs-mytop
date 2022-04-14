import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { MainPageModule } from './main-page/main-page.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
	//подключаем .env
	ConfigModule.forRoot(),
	//подключаемся к БД
	TypegooseModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		//вынесли в отдельный файл создание файла настроек БД /configs/mongo.config.ts
		useFactory: getMongoConfig
	}),
	AuthModule,
	ReviewModule,
	ProductModule,
	MainPageModule,
	FilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
