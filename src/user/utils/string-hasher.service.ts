import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';

Injectable();
export class StringHasherService {

  async stringHasher(password: string) {
    try {
      const hash = await import('bcrypt').then(bcrypt => bcrypt.hash(password, 10));

      return hash;
    } catch (error) {
      console.log(error);
      throw new Error('Error while hashing string');
    }
  }
}
