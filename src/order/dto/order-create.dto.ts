import { IsString, isString } from "class-validator";

export class OrderCreateDto {
  @IsString()
  customer: string;

  @IsString()
  items: string[];
}
