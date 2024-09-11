import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsNotEmpty, IsSemVer, IsString } from 'class-validator';
import { validate } from 'src/util/validate-util';

enum Environment {
  Development = 'development',
  Production = 'production',
}

export class AppEnvironmentVariables {
  @IsEnum(Environment)
  node_env: Environment;

  @IsNotEmpty()
  @IsInt()
  port: number;

  @IsNotEmpty()
  @IsString()
  jwt_secret: string;

  @IsNotEmpty()
  @IsInt()
  jwt_expires: number;
}

export default registerAs('app', () => {
  const config = {
    node_env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires: parseInt(process.env.JWT_EXPIRES, 10),
  };

  return validate(config, AppEnvironmentVariables);
});
