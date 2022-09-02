import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import {AuthModule} from "./auth/auth.module";
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { SmsModule } from './sms/sms.module';
import { AccessControlModule } from 'nest-access-control';
import {roles} from "./auth/user.roles";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          "type": "mysql",
          "host": "localhost",
          "port": 3306,
          "username": "root",
          "password": "",
          "database": "todo_megak_proj_koncowy_nest",
          "entities": ["dist/**/**.entity{.ts,.js}"],
          "bigNumberStrings": false,
          "logging": true,
          "synchronize": true
      }),
      TasksModule,
      AuthModule,
      UserModule,
      ChatModule,
      SmsModule,
      AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
