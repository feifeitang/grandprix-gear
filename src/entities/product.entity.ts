import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ length: 100 })
  productName: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stockQuantity: number;

  @Column('int')
  categoryId: number;

  @Column('int')
  supplierId: number;
}
