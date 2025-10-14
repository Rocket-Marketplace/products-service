import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../services/users.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionToken = request.headers['x-session-token'] || request.headers['authorization']?.replace('Bearer ', '');

    if (!sessionToken) {
      throw new UnauthorizedException('Session token required');
    }

    try {
      const sessionData = await this.usersService.validateSession(sessionToken);
      
      if (!sessionData.valid) {
        throw new UnauthorizedException('Invalid session');
      }

      // Adiciona os dados do usuário à requisição
      request.user = sessionData.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Session validation failed');
    }
  }
}
