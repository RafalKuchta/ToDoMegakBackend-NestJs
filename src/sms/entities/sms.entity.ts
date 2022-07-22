import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Sms extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    name: string;

    @Column({
        length: 255,
    })
    surname: string;

    @Column({
        length: 255,
    })
    company: string;

    @Column({
        length: 15,
    })
    phone: string;

    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    group: string;

    @Column({
        length: 255,
    })
    sms: string;

}
