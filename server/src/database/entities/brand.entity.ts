// define brand entity here

import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity('brands')
export class BrandEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;
}
