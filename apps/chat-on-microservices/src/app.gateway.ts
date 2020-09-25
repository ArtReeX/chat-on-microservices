import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from './guards/auth.guard';

@WebSocketGateway(3001)
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Server;

  @UseGuards(AuthGuard)
  handleConnection() {
    this.server.emit('msgToClient', `Connected`);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('msgToServer')
  handleMessage(_client: Socket, message: string): void {
    this.server.emit('msgToClient', message);
  }
}
