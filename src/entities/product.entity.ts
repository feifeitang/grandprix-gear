import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productId: number;

  @Column({ length: 100, name: 'product_name' })
  productName: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, name: 'price' })
  price: number;

  @Column('int', { name: 'stock_quantity' })
  stockQuantity: number;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @Column('int', { name: 'supplier_id' })
  supplierId: number;
}
