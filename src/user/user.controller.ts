import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserResponse } from '../interfaces/user';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post('/register')
  register(@Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(newUser);
  }

  @Get('/get-all')
  getAll() {
    return this.userService.getAll();
  }

  @Get('/get-one/:id')
  getOneUser(@Param('id') id: string) {
    return this.userService.getOneUser(id);
  }

  @Get('/roles/get-all')
  @UseGuards(AuthGuard('jwt'))
  findAllGroups() {
    return this.userService.findAllRoles();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'update',
    resource: 'posts',
  })
  update(@Param('id') id: string, @Body() req: UpdateUserDto) {
    return this.userService.update(id, req);
  }
}
