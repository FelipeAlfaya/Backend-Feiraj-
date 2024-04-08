/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRequest } from '../interfaces/request.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Você não está autenticado');
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Você não está autenticado');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Você não está autenticado');
    }

    const decoded: {
      id: number;
      email: string;
      type: string;
    } = this.jwtService.decode(token, {
      json: true,
    }) as any;

    if (!decoded) {
      throw new UnauthorizedException('Você não está autenticado');
    }

    request.set('user_id', decoded.id);
    request.set('user_type', decoded.type);
    request.set('user_email', decoded.email);

    return true;
  }
}
