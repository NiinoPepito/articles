import { ArrayMaxSize, IsObject, IsString, MinLength } from 'class-validator';
import { OrderItemCreateDto } from './order-item-create.dto';

export class OrderCreateDto {
  @IsString()
  customer: string;
  @ArrayMaxSize(3)
  @IsObject({ each: true })
  items: OrderItemCreateDto[];
}