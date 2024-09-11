import { IsEnum, IsNumber, MaxLength, MinLength } from 'class-validator';
import { TransactionType } from '../entity/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: TransactionType, example: TransactionType.INCOME })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    minLength: 4,
    example: 'Products',
  })
  @MinLength(4)
  category: string;

  @ApiProperty({
    maxLength: 400,
    example: 'Description',
  })
  @MaxLength(400)
  description: string;
}
