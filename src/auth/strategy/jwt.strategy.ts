import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'my_api_secret_key',
    });
  }

  async validate(payload: any) {
    // 👇 This is where we fetch and return the user
    const user = await this.usersService.getUserById(payload.sub); // sub is usually the user ID
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // This is assigned to req.user
  }
}
