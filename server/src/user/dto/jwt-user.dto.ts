import { PickType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class JwtUserDto extends PickType(CreateUserDto, ['name']) {
  @IsInt()
  id: number;
}
