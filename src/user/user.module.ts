import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { CreateUserService } from './use-case/create-user.service';
import { StringHasherService } from './utils/string-hasher.service';
import { GetUsersService } from './use-case/get-users.service';
import { GetUserByIdService } from "./use-case/get-user-by-id.service";
import { GetUsersByBirthplaceService } from "./use-case/get-user-birthplace.service";
import { UpdateUserService } from "./use-case/update-user.service";
import { UpdateUserPasswordService } from "./use-case/update-user-password.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserService,
    StringHasherService,
    GetUsersService,
    GetUserByIdService,
    GetUsersByBirthplaceService,
    UpdateUserService,
    UpdateUserPasswordService,
  ],
})
export class UserModule {}
