import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrderCreateDto } from "../dto/order-create.dto";
import { CreateOrderService } from "../use-case/create-order.service";
import { PayOrderService } from "../use-case/pay-order.service";
import { UpdateShippingService } from "../use-case/update-shipping.service";
import { ShippingUpdateDto } from "../dto/shipping-update.dto";
import { InvoiceAdressUpdateDto } from "../dto/invoice-adress-update.dto";
import { UpdateInvoiceAdressService } from "../use-case/update-invoice-adress.service";

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
    private readonly updateShippingAdressService: UpdateShippingService,
    private readonly updateInvoiceAdressService: UpdateInvoiceAdressService,
  ) {}
  @Post()
  createOrder(@Body() data: OrderCreateDto) {
    return this.createOrderService.createOrder(data);
  }

  @Put(':id/pay')
  payOrder(@Param('id') id: number) {
    return this.payOrderService.payOrder(id);
  }

  @Put(':id/shipping')
  updateShippingAdress(
    @Param('id') id: number,
    @Body() data: ShippingUpdateDto,
  ) {
    return this.updateShippingAdressService.updateShippingAdress(id, data);
  }

  @Put(':id/invoice-adress')
  updateInvoiceAdress(
    @Param('id') id: number,
    @Body() data: InvoiceAdressUpdateDto,
  ) {
    return this.updateInvoiceAdressService.updateInvoiceAdress(id, data);
  }
}
