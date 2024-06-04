import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { CreateOrderService } from '../use-case/create-order.service';
import { OrderCreateDto } from '../dto/order-create.dto';
import { PayOrderService } from '../use-case/pay-order.service';
import { OrderUpdateShippingDto } from '../dto/order-update-shipping.dto';
import { UpdateShippingOrderService } from '../use-case/update-shipping-order.service';
import { UpdateInvoiceAddressOrderService } from '../use-case/update-invoice-address-order.service';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
    private readonly updateShippingOrderService: UpdateShippingOrderService,
    private readonly updateInvoiceAddressOrderService: UpdateInvoiceAddressOrderService,
  ) {
  }

  @UseGuards(AuthGuard)
  @Post()
  createOrder(@Body() data: OrderCreateDto) {
    return this.createOrderService.createOrder(data);
  }

  @UseGuards(AuthGuard)
  @Put(':id/pay')
  updatePayOrder(@Param('id', ParseIntPipe) id: number) {
    return this.payOrderService.payOrder(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id/shipping')
  updateShippingAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateShippingDto
  ) {
    return this.updateShippingOrderService.updateShipping(id, data);
  }

  @UseGuards(AuthGuard)
  @Put(':id/invoice-address')
  updateInvoiceAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateInvoiceAddressDto
  ) {
    return this.updateInvoiceAddressOrderService.updateInvoiceAddress(id, data);
  }
}
