// define brand entity here

import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;
}
