import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post, UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { FindMainPageDto } from './dto/find-main-page.dto';
import { MainPageModel, TopLevelCategory } from './main-page.model';
import { MainPageService } from './main-page.service';
import { CreateMainPageDto } from './dto/create-main-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { MAIN_PAGE_BY_ALIAS_NOT_FOUND, MAIN_PAGE_NOT_FOUND } from './main-page.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('main-page')
export class MainPageController {
	constructor(private readonly mainPageService: MainPageService) {
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe()) //вешаем на validation на POST
	@Post('create')
	//Omit - исключить из модели '_id', он добавляется БД (Pick - включить необходимые поля)
	//позже создали CreateMainPageDto
	async create(@Body() dto: CreateMainPageDto) {
		return this.mainPageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const mainPage = await this.mainPageService.findById(id);
		if(!mainPage) {
			throw new NotFoundException(MAIN_PAGE_NOT_FOUND);
		}
		return mainPage;
	}

	@Get('/byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const findPage = await this.mainPageService.findByAlias(alias);
		if(!findPage) {
			throw new NotFoundException(MAIN_PAGE_BY_ALIAS_NOT_FOUND);
		}
		return findPage;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.mainPageService.deleteById(id);
		if(!deletedPage) {
			throw new NotFoundException(MAIN_PAGE_NOT_FOUND);
		}
		//вернет code 200
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: MainPageModel) {
		const updatedPage = await this.mainPageService.updateById(id, dto);
		if(!updatedPage) {
			throw new NotFoundException(MAIN_PAGE_NOT_FOUND);
		}
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindMainPageDto) {
		return this.mainPageService.findByTopLevelCategory(dto.firstCategory);
	}

	//docs.mongodb.com -> Indexes->Text Indexes
	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return this.mainPageService.findByText(text);
	}
}
