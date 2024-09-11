import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtUserDto } from 'src/user/dto/jwt-user.dto';
import { Request } from 'express';
import { LocalAuthGuard } from './guard/local.guard';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import {
  BadRequest,
  ConflictResponse,
  JwtResponse,
  UnathorizedResponse,
} from '@util/response';

@Controller('auth')
@ApiTags('auth')
@ApiBadRequestResponse({
  description: 'Bad request.',
  type: BadRequest,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ description: 'Creates a new user.' })
  @ApiCreatedResponse({
    description: 'User has been created succesfully.',
    type: JwtResponse,
  })
  @ApiConflictResponse({
    description: 'User with this username already exists.',
    type: ConflictResponse,
  })
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiUnauthorizedResponse({
    description: 'Wrong credentials.',
    type: UnathorizedResponse,
  })
  @ApiOperation({ description: 'Login user.' })
  @ApiOkResponse({
    description: 'User logged succesfully.',
    type: JwtResponse,
  })
  login(@Body() dto: LoginUserDto, @Req() req: Request & { user: JwtUserDto }) {
    return {
      ...this.authService.generateJwt(req.user),
      user: req.user,
    };
  }
}
