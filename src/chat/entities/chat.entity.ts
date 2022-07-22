import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    orderBy: {
        created_at: "ASC",
    }
})
export class Chat extends BaseEntity {
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

    @Column({
        type: 'datetime',
        default: () => 'NOW()',
    })
    created_at: Date;

}
