import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly $prismaService: PrismaService,
    private readonly $jwtService: JwtService,
  ) {}

  public async register(data: any) {
    try {
      const passwordHash = await argon2.hash(data.password);
      await this.$prismaService.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: passwordHash,
        },
      });

      return {
        message: 'success creating user',
      };
    } catch (error) {
      console.log(error);
    }
  }

  public async login(data: any) {
    const { passwordHash, ...user } = await this.$prismaService.user.findUnique(
      {
        where: {
          email: data.email,
        },
      },
    );

    if (!(await argon2.verify(passwordHash, data.password))) {
      throw new UnauthorizedException("Password didn't match");
    }
    const jwt = this.$jwtService.sign(
      {
        userId: user.id,
      },
      {
        secret: 'secret',
      },
    );

    data.response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }
}
