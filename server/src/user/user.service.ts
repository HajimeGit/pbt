import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const duplicate = await this.userRepository.existsBy({
      name: createUserDto.name,
    });

    if (duplicate) {
      throw new ConflictException('User with this username already exists.');
    }

    const password = hashSync(createUserDto.password, 10);

    const user = this.userRepository.create({
      name: createUserDto.name,
      password,
    });

    return await this.userRepository.save(user);
  }

  async findOneByName(name: string): Promise<User> {
    return await this.userRepository.findOneBy({ name });
  }

  async findOnyById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
