import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from '../user/user.entity';
import { Chat } from './entities/chat.entity';
import { ChatInterface } from '../interfaces/chat';

@Injectable()
export class ChatService {
  async create(req: CreateChatDto, user: User) {
    try {
      const chat = new Chat();
      chat.message = req.message;
      chat.user = user.email;

      await chat.save();
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<ChatInterface[]> {
    return await Chat.find();
  }
}
