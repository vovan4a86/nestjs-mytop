import { Controller, HttpCode, Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {

  //сущность создается, Post возвращает код 201
  @Post('register')
  async register() {

  }

  //данные не изменяются поэтому возвращаем 200
  @HttpCode(200)
  @Post('login')
  async login() {

  }
}
