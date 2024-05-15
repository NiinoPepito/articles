import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { StringHasherServiceInterface } from './string-hasher.service.interface';

Injectable();
export class StringHasherService implements StringHasherServiceInterface {

  async stringHasher(password: string) {
    try {
      const hash = await bcrypt.hash(password, 10);

      return hash;
    } catch (error) {
      console.log(error);
      throw new Error('Error while hashing string');
    }
  }
}
