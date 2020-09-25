import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './models/user.model';

type AuthorizePayload = Pick<User, 'login' | 'password'>;
type VerifyPayload = { token: string };

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth.authorize')
  async authorize({ login, password }: AuthorizePayload) {
    return { token: await this.appService.authorize(login, password) };
  }

  @MessagePattern('auth.verify')
  async verify({ token }: VerifyPayload) {
    return { authorized: await this.appService.validateToken(token) };
  }
}
