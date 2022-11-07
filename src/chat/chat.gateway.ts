import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';

@WebSocketGateway({
  cors: ['*'],
})
export class ChatGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: string,
    @UserObj() user: User,
  ): Promise<void> {
    this.server.emit('message', message);
  }
}
