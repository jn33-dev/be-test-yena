import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Rooms } from './rooms.entity';

@Entity()
export class Images {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('text')
    url: string;

    @Column()
    key: number;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @Column('int', { name: 'RoomId' })
    RoomId: number;

    @ManyToOne(() => Rooms, { cascade: ['update', 'remove'] })
    @JoinColumn({ name: 'RoomId', referencedColumnName: 'id' })
    Room: Rooms;
}
