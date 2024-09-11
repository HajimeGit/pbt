import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseEnvironmentVariables } from 'src/config/database.config';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return configService.get<DatabaseEnvironmentVariables>('database');
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
