import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity()
export class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 6, scale: 2 })
  @ApiProperty()
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.EXPENSE,
  })
  @ApiProperty()
  type: TransactionType;

  @CreateDateColumn()
  @ApiProperty()
  date: string;

  @Column()
  @ApiProperty()
  description: string;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn()
  author: User;
}
