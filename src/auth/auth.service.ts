import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(credentials: ValidateUserDto) {
    const user = await this.userService.findOne({
      where: {
        email: credentials.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    const isPasswordValid = compare(credentials.password, user.password);

    if (!isPasswordValid) {
      return new UnauthorizedException('E-mail ou senha incorretos');
    }

    const jwt = this.jwtService.sign({
      id: user.id,
      email: user.email,
      type: user.type,
    });

    return {
      token: jwt,
    };
  }
}
