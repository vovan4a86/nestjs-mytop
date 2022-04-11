import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

//наследуем Base через interface т.к. нельзя расширять одновременно от двух классов (TimeStamp и Base)
//TimeStamp добавит поля createdAt, updatedAt: Date
//Base - _id
export interface AuthModel extends Base {}
export class AuthModel extends TimeStamps {
  @prop({ unique: true }) //поле уникальное и является индексом (index: true)
  email: string;

  @prop()
  passwordHash: string;
}
