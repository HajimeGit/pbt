import { Transaction } from 'src/transaction/entity/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.author)
  transactions: Transaction[];
}
