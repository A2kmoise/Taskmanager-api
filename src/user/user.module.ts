import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/task.entity';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Task])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
