import { IsString, isString } from "class-validator";

export class UserUpdateDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  age: number;

  @IsString()
  birthplace: string;
}
