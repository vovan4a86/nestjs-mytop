import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
// import sharp from 'sharp'; //default import не сработает
import * as sharp from 'sharp';//нужно импорт всей библиотеки как sharp
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {

	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder); //убеждаемся что такой путь существует, добавляем папки если их нет

		const res: FileElementResponse[] = [];
		for(const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			res.push({
				url: `${uploadFolder}/${file.originalname}`,
				name: file.originalname
			});
		}
		return res;
	}

	//работает не только с webp (png, jpg,svg...)
	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file)
			.webp()
			.toBuffer();
	}
}
