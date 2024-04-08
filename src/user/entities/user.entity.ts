import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'type',
  },
})
export class User {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  type: string;

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

  @Column({
    type: 'float',
    default: 5.0,
  })
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
