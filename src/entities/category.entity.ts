import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({ type: 'varchar', length: 100 })
  categoryName: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
