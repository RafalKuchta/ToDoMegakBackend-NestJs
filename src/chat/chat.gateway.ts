import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {ChatService} from "./chat.service";

@WebSocketGateway(3002, {cors: '*'})
export class ChatGateway {

  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(
      @MessageBody() message: string,
      @UserObj() user: User,
  ): Promise<void> {
    console.log(message, user);
    this.server.emit('message', message);
  }
}
