import { IsArray, IsString } from "class-validator";

export class OrderCreateDto {
  @IsString()
  customer: string;

  @IsArray()
  items: string[];
}
