import { MarketPlace } from 'src/marketplace/entities/marketplace.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => MarketPlace, (marketplace) => marketplace.user)
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
