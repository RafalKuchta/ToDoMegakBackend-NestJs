import {ConflictException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {RegisterDto} from "./dto/register.dto";
import {RegisterUserResponse} from "../interfaces/user";
import {User} from "./user.entity";
import {hashPwd} from "../utils/hash-pwd";

@Injectable()
export class UserService {
  filter(user: User): RegisterUserResponse {
    const {id, email} = user;
    return {id, email};
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
    return await User.findOne({where: {id}});
  }

}