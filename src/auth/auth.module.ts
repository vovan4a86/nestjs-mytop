import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User' //если не указать коллекцию default: UserModel
				}
			}
		]),
		ConfigModule,
		JwtModule.registerAsync({
			//подключаем модуль и сервис для работы с .env
			imports: [ConfigModule],
			inject: [ConfigService],
			//вынесли в отдельный конфиг файл
			useFactory: getJWTConfig
		}),
		PassportModule
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
