import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtUserDto } from 'src/user/dto/jwt-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserWithPassword(name: string, password: string) {
    const user = await this.userService.findOneByName(name);

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    const validatedPassword = await compare(password, user.password);

    if (!validatedPassword) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    return { id: user.id, name: user.name };
  }

  async validateUserById(id: number) {
    const user = await this.userService.findOnyById(id);

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    return { id: user.id, name: user.name };
  }

  async register(createUserDto: CreateUserDto) {
    const userEntity = await this.userService.create(createUserDto);
    const { password, ...user } = userEntity;

    return {
      ...this.generateJwt(user),
      user,
    };
  }

  generateJwt(user: JwtUserDto) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        name: user.name,
      }),
    };
  }
}
