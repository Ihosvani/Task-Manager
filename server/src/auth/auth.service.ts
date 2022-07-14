import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@generated/prisma-graphql/user';
@Injectable()
export class AuthService {
  constructor(
    private readonly $prismaService: PrismaService,
    private readonly $jwtService: JwtService,
  ) {}

  public async register(data: any) {
    try {
      if (
        await this.$prismaService.user.findUnique({
          where: {
            email: data.email,
          },
        })
      ) {
        throw new BadRequestException('User already existent');
      }
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
    } catch (err) {
      return err;
    }
  }

  public async login(user: User) {
    const jwt = this.$jwtService.sign(
      {
        userId: user.id,
      },
      {
        secret: 'secret',
      },
    );

    return {
      token: jwt,
    };
  }

  public async validateUser(email: string, password: string) {
    const lookUser = await this.$prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!lookUser) {
      return null;
    }

    const { passwordHash, ...user } = lookUser;

    if (!(await argon2.verify(passwordHash, password))) {
      return null;
    }
    return user;
  }
}
