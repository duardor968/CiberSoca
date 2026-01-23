import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

const DEFAULT_SESSION_DAYS = 7;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ token: string; maxAgeMs: number }> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { roles: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const sessionDays = this.getSessionDays();
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles.map((role) => role.role),
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: `${sessionDays}d`,
    });

    return { token, maxAgeMs: sessionDays * 24 * 60 * 60 * 1000 };
  }

  private getSessionDays(): number {
    const rawValue = process.env.JWT_EXPIRES_IN_DAYS;
    const parsed = rawValue ? Number.parseInt(rawValue, 10) : DEFAULT_SESSION_DAYS;

    if (!Number.isFinite(parsed) || parsed <= 0) {
      return DEFAULT_SESSION_DAYS;
    }

    return parsed;
  }
}
