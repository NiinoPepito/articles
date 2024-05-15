import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { CreateUserService } from './use-case/create-user.service';
import { StringHasherService } from './utils/string-hasher.service';
import { StringHasherServiceInterface } from "./utils/string-hasher.service.interface";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserService,
    StringHasherService,
    {
    provide: CreateUserService,
      useFactory: (stringHasherService: StringHasherServiceInterface) => {
      return new CreateUserService(stringHasherService);
    },
    inject: [StringHasherService],
  },],
})
export class UserModule {}
