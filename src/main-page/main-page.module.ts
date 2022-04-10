import { Module } from '@nestjs/common';
import { MainPageController } from './main-page.controller';

@Module({
  controllers: [MainPageController]
})
export class MainPageModule {}
