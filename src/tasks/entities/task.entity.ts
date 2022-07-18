import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {User} from "../../user/user.entity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 1000
    })
    name: string;

    @Column()
    completed: boolean;

    @Column({
        length: 255,
    })
    user: string;

}
