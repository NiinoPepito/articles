import { IsNumber, isNumber, IsString, isString, MinLength } from "class-validator";

export class UserCreateDto {

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  password: string;

  @IsNumber()
  age: number;

  @IsString()
  birthplace: string;
}
