import { IsString, MinLength } from 'class-validator';

export class OrderItemCreateDto {
  @IsString()
  product: string;
  @IsString()
  quantity: number;
  @IsString()
  price: number;
}