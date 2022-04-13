import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { index, prop } from '@typegoose/typegoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export class HhData {
  @prop()
  count: number;

  @prop()
  juniorSalary: number;

  @prop()
  middleSalary: number;

  @prop()
  seniorSalary: number;
}

export class MainPageAdvantage {
  @prop()
  title: string;

  @prop()
  description: string;
}

export interface MainPageModel extends Base {}

// @index({ title: 'text', seoText: 'text'}) //поиск по определенным полям
@index({ '$**': 'text'})  //с заходом во все массивы и объекты
export class MainPageModel extends TimeStamps {

  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @prop()
  secondCategory: string; // ex. ДИЗАЙН, РАЗАРАБОТКА, МАРКЕТИНГ

  @prop({ unique: true })
  alias: string;  // ex. photoshop

  // @prop({ text: true }) //текстовый индекс
  @prop()
  title: string;  //курсы по photoshop

  @prop()
  category: string;

  @prop({ type: () => [HhData]})
  hh?: HhData;

  @prop({ type: () => [MainPageAdvantage] })
  advantages: MainPageAdvantage[];

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({ type: () => [String] })
  tags: string[];
}
