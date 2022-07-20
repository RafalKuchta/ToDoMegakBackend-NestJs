import {Controller, Get, Post, Body, Put, Param, Delete, UseGuards} from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
  
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  create(
      @Body() createSmDto: CreateSmDto,
      @UserObj() user: User,
  ) {
    return this.smsService.create(createSmDto);
  }

  @Get('/get-all')
  @UseGuards(AuthGuard('jwt'))
  findAll(
      @UserObj() user: User,
  ) {
    return this.smsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSmDto: UpdateSmDto) {
    return this.smsService.update(+id, updateSmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smsService.remove(+id);
  }
}
