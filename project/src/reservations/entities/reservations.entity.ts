import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Rooms } from '../../rooms/entities/rooms.entity';

@Entity()
export class Reservations {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('tinytext')
    startDate: string;

    @Column('tinytext')
    endDate: string;

    @Column('tinyint')
    adults: number;

    @Column('tinyint')
    children: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date | null;

    @Column('int', { name: 'UserId' })
    UserId: number;

    @Column('int', { name: 'RoomId' })
    RoomId: number;

    @ManyToOne(() => Users, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'UserId', referencedColumnName: 'id' })
    User: Users;

    @ManyToOne(() => Rooms, { onDelete: 'SET NULL', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({ name: 'RoomId', referencedColumnName: 'id' })
    Room: Rooms;
}
