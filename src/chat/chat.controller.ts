import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createChatDto: CreateChatDto, @UserObj() user: User) {
    return this.chatService.create(createChatDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.chatService.findAll();
  }
}
