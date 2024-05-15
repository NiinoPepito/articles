import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { StringHasherService } from '../utils/string-hasher.service';

Injectable();
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly stringHasherService: StringHasherService,
  ) {}

  async createUser(data: UserCreateDto) {
    try {
      data.password = await this.stringHasherService.stringHasher(data.password);
      return this.userRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
}
