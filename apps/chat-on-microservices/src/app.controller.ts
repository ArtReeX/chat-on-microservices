import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface Auth {
  login: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async login(@Body() authBody): Promise<{ token: string }> {
    const { login, password } = authBody;
    return { token: await this.appService.authorize(login, password) };
  }
}
