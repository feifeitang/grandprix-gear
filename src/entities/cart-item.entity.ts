import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CartItems')
export class CartItem {
  @PrimaryGeneratedColumn({ name: 'cart_item_id' })
  cartItemId: number;

  @Column({ nullable: false, name: 'cart_id' })
  cartId: number;

  @Column({ nullable: false, name: 'product_id' })
  productId: number;

  @Column({ nullable: false })
  quantity: number;
}
