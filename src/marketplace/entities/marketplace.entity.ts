import { Product } from 'src/product/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class MarketPlace {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @Column()
  user_id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @Column({
    unique: true,
  })
  CNPJ: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.marketplace)
  products: Product[];

  @BeforeInsert()
  beforeInsertActions() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  beforeUpdateActions() {
    this.updated_at = new Date();
  }
}
