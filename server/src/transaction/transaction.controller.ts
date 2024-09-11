import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TransactionService } from './transaction.service';
import { User } from 'src/user/entity/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Transaction } from './entity/transaction.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnathorizedResponse, ResponseMessage } from '@util/response';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
@ApiTags('transaction')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unathorized',
  type: UnathorizedResponse,
})
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  @ApiCreatedResponse({
    description: 'Transaction has been created succesfully.',
    type: ResponseMessage,
  })
  async create(
    @Body() dto: CreateTransactionDto,
    @Req() req: Request & { user: User },
  ): Promise<object> {
    await this.transactionService.create({ author: req.user, ...dto });

    return {
      message: 'Transaction has been created succesfully.',
    };
  }

  @Get('all')
  @ApiOkResponse({
    description: 'Return all transaction per user.',
    type: [Transaction],
  })
  async all(@Req() req: Request & { user: User }): Promise<Transaction[]> {
    return await this.transactionService.getAll(req.user);
  }
}
