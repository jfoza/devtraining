import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { compare } from 'bcrypt';
import { AuthResponseContract } from './contracts/auth.response.contract';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(authDto: AuthDto): Promise<AuthResponseContract> {
    const user: User = await this.usersRepository.findOne({
      where: { email: authDto.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordConfirmed = await compare(authDto.password, user.password);

    if (!passwordConfirmed) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload);

    const expiresIn = +this.configService.get<number>('JWT_EXPIRATION');

    return {
      token,
      type: 'jwt',
      expiresIn: `${expiresIn}s`,
    };
  }
}
