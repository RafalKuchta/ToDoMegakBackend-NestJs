import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

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
      TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
