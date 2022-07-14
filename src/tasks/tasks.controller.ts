import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {AuthGuard} from "@nestjs/passport";

@Controller('todo')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
      @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('/search/:name?')
  @UseGuards(AuthGuard('jwt'))
  findAll(
      @Param() name: string,
  ) {
    return this.tasksService.findAll(name ?? '');
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }


  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  update(
      @Param('id') id: string,
      @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }


  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
