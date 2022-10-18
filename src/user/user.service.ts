import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import {
  RegisterUserResponse,
  UserResponse,
  UserRolesResponse,
} from '../interfaces/user';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './roles.entity';

@Injectable()
export class UserService {
  filter(user: User): RegisterUserResponse {
    const { id, email, roles } = user;
    return { id, email, roles: [] };
  }

  filterGetUsers(user: User): UserResponse {
    const { id, email, roles } = user;
    return { id, email, roles };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const user = new User();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.pwd);

    // const findUserinBase = await User.findOne({where: {
    //         email: newUser.email,
    //     }});
    //
    // if (findUserinBase.email){
    //     throw new ConflictException(`Username: ${findUserinBase.email} is existed`)
    // }

    await user.save();
    return this.filter(user);
  }

  async getOneUser(id: string): Promise<User> {
    const response = await User.findOne({
      where: { id },
    });

    return response;
  }

  async getAll(): Promise<UserResponse[]> {
    const response: UserResponse[] = await User.find();

    return response.map(this.filterGetUsers);
  }

  async update(id: string, req: UpdateUserDto) {
    if (!id) {
      throw new Error('Task not found!');
    }

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (user) {
      user.email = req.email;
      user.roles = req.roles;
      await user.save();

      return {
        isSuccess: true,
      };
    }

    return {
      isSuccess: false,
    };
  }

  async findAllRoles(): Promise<UserRolesResponse[]> {
    return await Roles.find();
  }
}
