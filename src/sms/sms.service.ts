import { Injectable } from '@nestjs/common';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import {AddSmsResponse} from "../interfaces/sms";
import {Sm} from "./entities/sm.entity";
import {User} from "../user/user.entity";


@Injectable()
export class SmsService {

  filter(sm: Sm): AddSmsResponse {
    const {id, phone} = sm;
    return {id, phone};
  }


  async create(createSmDto: CreateSmDto): Promise<AddSmsResponse> {
    console.log(createSmDto)
    const sm = new Sm();
    sm.name = createSmDto.name;
    sm.surname = createSmDto.surname;
    sm.company = createSmDto.company;
    sm.phone = createSmDto.phone;
    sm.group = createSmDto.group;

    await sm.save();

    return this.filter(sm);
  }

  async findAll(user: User): Promise<AddSmsResponse[]> {
    console.log({user})
    return (await Sm.find()).map(this.filter);
  }

  findOne(id: number) {
    return `This action returns a #${id} sm`;
  }

  update(id: number, updateSmDto: UpdateSmDto) {
    return `This action updates a #${id} sm`;
  }

  remove(id: number) {
    return `This action removes a #${id} sm`;
  }
}
