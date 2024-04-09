import { MarketPlace } from 'src/marketplace/entities/marketplace.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinTable,
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

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  type: string;

  @Column()
  buy_price: number;

  @Column()
  sell_price: number;

  @Column()
  quantity: number;

  @Column()
  status: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => MarketPlace, (marketplace) => marketplace.products)
  @JoinTable({
    name: 'marketplace_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'marketplace_id',
      referencedColumnName: 'id',
    },
  })
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
