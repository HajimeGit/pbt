import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus;

  @ApiProperty({ example: ['Invalid input data'] })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class ConflictResponse {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  statusCode: HttpStatus;

  @ApiProperty({ example: ['Resourse already exists.'] })
  message: string[];

  @ApiProperty({ example: 'Conflict' })
  error: string;
}

export class UnathorizedResponse {
  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: HttpStatus;

  @ApiProperty({ example: ['Unauthorized.'] })
  message: string[];
}

export class JwtResponse {
  @ApiProperty({ example: 'your.jwt.token' })
  access_token: string;
}

export class ResponseMessage {
  @ApiProperty()
  message: string;
}
