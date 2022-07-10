/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './user/user.resolver';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TaskResolver } from './task/task.resolver';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      context: ({ req }) => ({ req }),
      debug: true,
      playground: true,
    }),
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, PrismaService, JwtStrategy, JwtService, TaskResolver],
})
export class AppModule {}
