import {Injectable} from '@nestjs/common';
import {CreateSmDto, CreateSmsDto} from './dto/create-sm.dto';
import {UpdateSmDto} from './dto/update-sm.dto';
import {AddSmsResponse, SendSmsResponse} from "../interfaces/sms";
import {Sm} from "./entities/sm.entity";
import {User} from "../user/user.entity";
import {Sms} from "./entities/sms.entity";

@Injectable()
export class SmsService {

    filter(sm: Sm): AddSmsResponse {
        const {id, phone, name, surname, company} = sm;
        return {id, phone, name, surname, company};
    }


    async create(createSmDto: CreateSmDto): Promise<AddSmsResponse> {
        const sm = new Sm();
        sm.name = createSmDto.name;
        sm.surname = createSmDto.surname;
        sm.company = createSmDto.company;
        sm.phone = createSmDto.phone;
        sm.group = createSmDto.group;

        await sm.save();

        return this.filter(sm);
    }

    async send(createSmsDto: CreateSmsDto): Promise<SendSmsResponse> {
        console.log(createSmsDto)
        const sms = new Sms();
        sms.phone = createSmsDto.mobile_number;
        sms.group = createSmsDto.mobile_numbers;
        sms.sms = createSmsDto.message;

        await sms.save();

        for (const item of createSmsDto.phones){
            const sms2 = new Sms();
                    sms2.phone = item.phone;
                    sms2.sms = createSmsDto.message;

                    await sms2.save()
        }

        return sms;
    }

    async findAll(user: User): Promise<AddSmsResponse[]> {
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
