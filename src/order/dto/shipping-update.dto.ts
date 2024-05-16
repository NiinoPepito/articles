import { IsString, isString } from "class-validator";

export class ShippingUpdateDto {
  @IsString()
  shippingAddress: string;

  @IsString()
  shippingMethod: string;
}
