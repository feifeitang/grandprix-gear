import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @Column({ length: 100 })
  supplier_name: string;

  @Column({ length: 100, nullable: true })
  contact_name: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phone: string;
}
