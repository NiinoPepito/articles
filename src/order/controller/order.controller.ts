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

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
  ) {}
  @Post()
  createOrder(@Body() data: OrderCreateDto) {
    return this.createOrderService.createOrder(data);
  }

  @Put(':id/pay')
  payOrder(@Param('id') id: number) {
    return this.payOrderService.payOrder(id);
  }
}
