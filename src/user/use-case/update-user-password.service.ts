import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "../entity/user.entity";
import { UserPasswordUpdateDto } from "../dto/user-password-update.dto";
import { StringHasherService } from "../utils/string-hasher.service";

Injectable();
export class UpdateUserPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly stringHasherService: StringHasherService,
  ) {}

  async updateUserPassword(id: number, data: UserPasswordUpdateDto) {
    const user = await this.userRepository.findOneBy({ id });
    user.password = await this.stringHasherService.stringHasher(data.password);

    await this.userRepository.save(user);

    return user;
  }
}