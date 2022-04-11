import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { FindMainPageDto } from './dto/find-main-page.dto';
import { MainPageModel } from './main-page.model';

@Controller('main-page')
export class MainPageController {

  @Post('create')
  //Omit - исключить из модели '_id', он добавляется БД (Pick - включить необходимые поля)
  async create(@Body() dto: Omit<MainPageModel, '_id'>) {

  }

  @Get(':id')
  async get(@Param('id') id: string) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: MainPageModel) {

  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindMainPageDto) {

  }
}
