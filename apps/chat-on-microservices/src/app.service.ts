import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_MODULE') private readonly authService: ClientProxy,
  ) {}

  async authorize(login: string, password: string): Promise<string> {
    const { token } = await this.authService
      .send<{ token: string }>('auth.authorize', { login, password })
      .toPromise();

    return token;
  }

  async verify(token: string): Promise<boolean> {
    const { authorized } = await this.authService
      .send<{ authorized: boolean }>('auth.verify', { token })
      .toPromise();

    return authorized;
  }
}
