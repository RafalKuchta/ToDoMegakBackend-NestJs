import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('todo')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
      @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('/search/:name?')
  findAll(
      @Param() name: string,
  ) {
    return this.tasksService.findAll(name ?? '');
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }


  @Patch('/:id')
  update(
      @Param('id') id: string,
      @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }


  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
