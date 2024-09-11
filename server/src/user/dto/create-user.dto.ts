import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ minLength: 2 })
  @MinLength(2)
  name: string;

  @ApiProperty({ minLength: 6 })
  @MinLength(6)
  password: string;
}
