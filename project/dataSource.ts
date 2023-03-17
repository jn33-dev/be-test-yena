import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Reservations } from './src/reservations/entities/reservations.entity';
import { Images } from './src/rooms/entities/images.entity';
import { Rooms } from './src/rooms/entities/rooms.entity';
import { Users } from './src/users/entities/users.entity';

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [Users, Rooms, Images, Reservations],
    synchronize: true,
    logging: true,
    timezone: 'Z',
    cache: true,
});

export default dataSource;
