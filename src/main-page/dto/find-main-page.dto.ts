import { TopLevelCategory } from '../main-page.model';
import { IsEnum } from 'class-validator';

export class FindMainPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
