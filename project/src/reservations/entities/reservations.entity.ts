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

    @Column('varchar')
    startDate: string;

    @Column('varchar')
    endDate: string;

    @Column('tinyint')
    adults: number;

    @Column('tinyint')
    children: number;

    @Column('varchar')
    contact: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date | null;

    @Column('int', { name: 'UserId', nullable: true })
    UserId: number | null;

    @Column('int', { name: 'RoomId', nullable: true })
    RoomId: number | null;

    @ManyToOne(() => Users, { cascade: ['soft-remove', 'update'], onDelete: 'SET NULL' })
    @JoinColumn({ name: 'UserId', referencedColumnName: 'id' })
    User: Users;

    @ManyToOne(() => Rooms, { onDelete: 'SET NULL', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({ name: 'RoomId', referencedColumnName: 'id' })
    Room: Rooms;
}
