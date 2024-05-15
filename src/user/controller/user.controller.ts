import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserService } from '../use-case/create-user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { GetUsersService } from "../use-case/get-users.service";
import { GetUserByIdService } from "../use-case/get-user-by-id.service";
import { GetUsersByBirthplaceService } from "../use-case/get-user-birthplace.service";
import { UserUpdateDto } from "../dto/user-update.dto";
import { UpdateUserService } from "../use-case/update-user.service";
import { UserPasswordUpdateDto } from "../dto/user-password-update.dto";
import { UpdateUserPasswordService } from "../use-case/update-user-password.service";
import passport from "passport";


@Controller('users')
export class UserController {

  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUsersService: GetUsersService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly getUsersByBirthplaceService: GetUsersByBirthplaceService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
  ) {}

  @Get()
  getAllUsers() {
    return this.getUsersService.getAllUsers();
  }

  // faire un get par ville de naissance
  @Get('by-birthplace/:birthplace')
  getUsersByBirthplace(@Param('birthplace') birthplace: string) {
    return this.getUsersByBirthplaceService.getUsersByBirthplace(birthplace);
  }

  @Get(':id')
  getOneUserById(@Param('id', ParseIntPipe) id: number) {
    return this.getUserByIdService.getOneUserById(id);
  }

  @Post()
  createUser(@Body() data: UserCreateDto) {
    return this.createUserService.createUser(data);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
  ) {
    return this.updateUserService.updateUser(id, data);
  }

  @Put(':id/password')
  updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserPasswordUpdateDto,
  ) {
    return this.updateUserPasswordService.updateUserPassword(id, data);
  }
}
