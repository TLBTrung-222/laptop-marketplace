// define user entity here

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum UserType {
    BUYER = 'buyer',
    SELLER = 'seller',
    ADMIN = 'admin'
}

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    phoneNumber: string

    @Column()
    passwordHash: string

    @Column()
    name: string

    @Column({ type: 'text', enum: UserType })
    type: UserType

    // avatar
    @Column({ type: 'blob', nullable: true })
    avatar: Buffer
}
