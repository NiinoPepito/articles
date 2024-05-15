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

@Controller('users')
export class UserController {

  constructor(
    private readonly createUserService: CreateUserService
  ) {}

  @Post()
  createUser(@Body() data: UserCreateDto) {
    return this.createUserService.createUser(data);
  }
}
