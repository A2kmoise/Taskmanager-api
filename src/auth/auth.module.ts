import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Task } from 'src/task/task.entity';
import { JwtModule } from '@nestjs/jwt';
import { register } from 'module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User,Task]), JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
