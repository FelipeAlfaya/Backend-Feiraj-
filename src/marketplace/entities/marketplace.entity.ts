import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class MarketPlace {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column({
    unique: true,
  })
  cnpj: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.marketplace)
  @JoinTable({
    name: 'marketplace_products',
    joinColumn: {
      name: 'marketplace_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @OneToOne(() => User, (user) => user.marketplace)
  user: User;

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
