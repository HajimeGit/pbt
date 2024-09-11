import { registerAs } from '@nestjs/config';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { validate } from '@util/validate-util';
import { User } from 'src/user/entity/user.entity';
import { Transaction } from 'src/transaction/entity/transaction.entity';
import { Category } from 'src/category/entity/category.entity';

export class DatabaseEnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsInt()
  port: number;

  @IsString()
  @IsNotEmpty()
  database: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export const getDatabaseConfig = () => {
  return validate(
    {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      type: 'mysql',
      synchronize: false,
      entities: [User, Transaction, Category],
      migrations: [__dirname + '/../../dist/migrations/*.{js,ts}'],
      cli: {
        migrationsDir: 'migrations',
      },
    },
    DatabaseEnvironmentVariables,
  );
};

export default registerAs('database', () => getDatabaseConfig());
