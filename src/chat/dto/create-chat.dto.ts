import {Column, PrimaryGeneratedColumn} from "typeorm";

export class CreateChatDto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 99999
    })
    message: string;

    @Column({
        length: 255,
    })
    user: string;

}
