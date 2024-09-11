import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

export function validate(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<any>,
) {
  const validatedConfig = plainToInstance(envVariablesClass, config, {
    enableImplicitConversion: true,
  });

  const errors: ValidationError[] = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return validatedConfig;
}
