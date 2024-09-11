import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategory(name: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOneBy({ name });

    if (existingCategory) {
      return existingCategory;
    } else {
      const category = this.categoryRepository.create({ name });
      try {
        return await this.categoryRepository.save(category);
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }
  }
}
