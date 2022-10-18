import { Injectable } from '@nestjs/common';
import { CreateSmDto, CreateSmsDto } from './dto/create-sm.dto';

import {
  AddGroupResponse,
  AddSmsResponse,
  SendGroupResponse,
  SendResponse,
} from '../interfaces/sms';
import { Phone } from './entities/phone.entity';
import { Sms } from './entities/sms.entity';
import { Group } from './entities/group.entity';
import { Like } from 'typeorm';

@Injectable()
export class SmsService {
  filter(phoneToAdd: Phone): AddSmsResponse {
    const { id, phone, name, surname, company, position, groups } = phoneToAdd;
    return { id, phone, name, surname, company, position, groups };
  }

  filterGroup(groupToAdd: Group): AddGroupResponse {
    const { id, name } = groupToAdd;
    return { id, name };
  }

  async create(createSmDto: CreateSmDto): Promise<AddSmsResponse> {
    const phone = new Phone();
    phone.name = createSmDto.name;
    phone.surname = createSmDto.surname;
    phone.company = createSmDto.company;
    phone.position = createSmDto.position;
    phone.phone = createSmDto.phone;

    await phone.save();

    return this.filter(phone);
  }

  async send(createSmsDto: CreateSmsDto): Promise<SendResponse> {
    const sms = new Sms();
    sms.phone = createSmsDto.code + createSmsDto.mobile_number;
    sms.sms = createSmsDto.message;
    sms.user = createSmsDto.user;

    if (createSmsDto.mobile_number.length > 5) {
      await sms.save();
    }

    if (createSmsDto.phones) {
      for (const item of createSmsDto.phones) {
        const sms2 = new Sms();
        sms2.phone = '+48' + item.phone;
        sms2.sms = createSmsDto.message;
        sms2.user = createSmsDto.user;

        await sms2.save();
      }
      return {
        message: 'ok',
      };
    }

    if (createSmsDto.groups) {
      for (const item of createSmsDto.groups) {
        if (item.group === 'Próbkobiorcy') {
          const allProbkoPhones = await Phone.find();

          for (const allphones of allProbkoPhones) {
            const smsToAll = new Sms();
            smsToAll.phone = '+48' + allphones.phone;
            smsToAll.name = allphones.name;
            smsToAll.surname = allphones.surname;
            smsToAll.company = allphones.company;
            smsToAll.group = item.group;
            smsToAll.sms = createSmsDto.message;
            smsToAll.user = createSmsDto.user;
            await smsToAll.save();
          }
        }

        const phonesFromGroups = await Phone.find({
          where: {
            groups: {
              name: item.group,
            },
          },
        });

        for (const phonesFromGroup of phonesFromGroups) {
          const smsToGroup = new Sms();
          smsToGroup.phone = '+48' + phonesFromGroup.phone;
          smsToGroup.name = phonesFromGroup.name;
          smsToGroup.surname = phonesFromGroup.surname;
          smsToGroup.company = phonesFromGroup.company;
          smsToGroup.group = item.group;
          smsToGroup.sms = createSmsDto.message;
          smsToGroup.user = createSmsDto.user;
          await smsToGroup.save();
        }
      }
    }
    return {
      message: 'ok',
    };
  }

  async findAll(): Promise<AddSmsResponse[]> {
    return (
      await Phone.find({
        relations: ['groups'],
      })
    ).map(this.filter);
  }

  async findAllGroups(): Promise<SendGroupResponse[]> {
    return (await Group.find()).map(this.filterGroup);
  }

  async findOneNumber(id: string): Promise<Phone> {
    return await Phone.findOne({
      where: {
        id,
      },
      relations: {
        groups: true,
      },
    });
  }

  async getAllSent(date) {
    return await Sms.find({
      where: {
        created_at: Like(`${date.id}%`),
      },
    });
  }

  async update(id: string, req: CreateSmDto) {
    if (!id) {
      throw new Error('Task not found!');
    }

    const phone = await Phone.findOne({
      where: {
        id,
      },
    });

    if (phone) {
      phone.name = req.name;
      phone.surname = req.surname;
      phone.company = req.company;
      phone.position = req.position;
      phone.phone = req.phone;
      await phone.save();

      if (req.group) {
        const group = await Group.findOne({
          where: {
            name: req.group,
          },
        });

        phone.groups = group;
        await phone.save();
      } else {
        phone.groups = null;
        await phone.save();
      }

      return {
        isSuccess: true,
      };
    }

    return {
      isSuccess: false,
    };
  }
}
