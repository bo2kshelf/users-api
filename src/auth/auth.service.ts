import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    where: Parameters<UsersService['getUser']>[0],
    password: string,
  ) {
    const user = await this.usersService.getUser(where);
    if (user && user.password === password) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {userId: user.userId};
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      access_token: this.jwtService.sign(payload),
    };
  }
}
