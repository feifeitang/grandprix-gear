import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Carts')
export class Cart {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  cartId: number;

  @Column({ nullable: true, name: 'user_id' })
  userId: number;

  @Column({ nullable: true, name: 'session_id' })
  sessionId: string;
}
