import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Images } from './imgaes.entity';
import { Reservations } from '../../reservations/entities/reservations.entity';

@Entity()
export class Rooms {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column()
    name: string;

    @Column('mediumtext')
    description: string;

    @Column('text')
    address: string;

    @Column()
    university: string;

    @Column()
    houseType: string;

    @Column('int')
    pricePerDay: number;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @OneToMany(() => Images, (images) => images.Room, { eager: true })
    images: Images[];

    @OneToMany(() => Reservations, (reservations) => reservations.Room)
    Reservations: Reservations[];
}
