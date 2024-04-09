import { MarketPlace } from 'src/marketplace/entities/marketplace.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  status: string;

  @Column()
  image: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => MarketPlace, (marketplace) => marketplace.products)
  marketplace: MarketPlace;

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
