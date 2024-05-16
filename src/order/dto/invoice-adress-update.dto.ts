import { IsString, isString } from "class-validator";

export class InvoiceAdressUpdateDto {
  @IsString()
  invoiceAdress: string;
}
