import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }

  async validate(name: string, password: string) {
    return this.authService.validateUserWithPassword(name, password);
  }
}
