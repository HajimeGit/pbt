import { Injectable } from '@nestjs/common';
import { Transaction } from './entity/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { CategoryService } from 'src/category/category.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(payload: CreateTransactionDto & { author: User }) {
    const { category, ...result } = payload;

    const transaction = this.transactionRepository.create({
      category: await this.categoryService.getCategory(category),
      ...result,
    });

    return await this.transactionRepository.save(transaction);
  }

  async getAll(user: User) {
    return this.transactionRepository.find({
      where: { author: user },
      relations: {
        category: true,
      },
      order: {
        date: 'DESC',
      },
    });
  }
}
