import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from '../task/task.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(()=>Task, task => task.user)
    tasks:Task[]

}