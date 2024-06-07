import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @CreateDateColumn()
  orderDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column()
  status: string;

  @Column()
  userId: number;
}
