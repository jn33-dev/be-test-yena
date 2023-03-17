import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Reservations } from '../../reservations/entities/reservations.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    nickname: string;

    @Column('text')
    password: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date | null;

    @OneToMany(() => Reservations, (reservations) => reservations.User)
    reservations: Reservations[];
}
