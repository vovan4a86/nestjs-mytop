export class AuthDto {
  login: string;
  password: string; //передаем сам пароль, а не хэш
}
