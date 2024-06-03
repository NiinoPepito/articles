import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserByEmailService } from '../../user/use-case/get-user-by-email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entity/user.entity';
import { Repository } from 'typeorm';
import { HashPasswordService } from '../../user/utils/hash-password.service';
import { ComparePasswordService } from '../../user/utils/compare-password.service';

@Injectable()
export class AuthService {
  constructor(
    private getUserByEmailService: GetUserByEmailService,
    private jwtService: JwtService,
    private hashPasswordService: HashPasswordService,
    private comparePasswordService: ComparePasswordService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.getUserByEmailService.getUserByEmail(email);
    const comparePassword = await this.comparePasswordService.comparePassword(pass, user.password);
    console.log(pass, user.password);
    console.log(comparePassword);
    if (!comparePassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}