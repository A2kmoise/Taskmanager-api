import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description: string

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE'})
    user: User;
}