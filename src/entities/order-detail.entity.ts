import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderDetailId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  orderId: number;

  @Column({ type: 'int' })
  productId: number;
}
