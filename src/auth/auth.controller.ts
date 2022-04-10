import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {

  //сущность создается, Post возвращает код 201
  @Post('register')
  async register(@Body() dto: AuthDto) {

  }

  //данные не изменяются поэтому возвращаем 200
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {

  }
}
