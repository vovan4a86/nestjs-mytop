import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ID_VALIDATION_ERROR } from './id-validation.constants';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	//хоть метод и трансформ, мы просто делаем валидацию id
	transform(value: string, metadata: ArgumentMetadata) {
		//валидируем там где есть param
		if (metadata.type != 'param') {
			return value;
		}
		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException(ID_VALIDATION_ERROR);
		}
		return value;
	}
}
