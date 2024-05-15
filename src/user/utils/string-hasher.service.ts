import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

Injectable();
export class StringHasherService {

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
