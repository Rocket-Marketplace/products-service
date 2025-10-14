import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface UserSession {
  valid: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
  } | null;
}

@Injectable()
export class UsersService {
  private readonly usersServiceUrl = process.env.USERS_SERVICE_URL || 'http://localhost:3000';

  constructor(private readonly httpService: HttpService) {}

  async validateSession(sessionToken: string): Promise<UserSession> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.usersServiceUrl}/sessions/validate/${sessionToken}`)
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return { valid: false, user: null };
      }
      throw new HttpException(
        'Users service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  async getUserById(userId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.usersServiceUrl}/users/${userId}`)
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw new HttpException(
        'Users service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}
