import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AppService } from '../app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const verified = await this.appService.verify(client.handshake.query.token);

    if (!verified) {
      throw new WsException('Unauthorized user.');
    }

    return true;
  }
}
