import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from "./entity/order.entity";
import { OrderController } from "./controller/order.controller";
import { CreateOrderService } from "./use-case/create-order.service";
import { PayOrderService } from "./use-case/pay-order.service";
import { UpdateShippingService } from "./use-case/update-shipping.service";
import { UpdateInvoiceAdressService } from "./use-case/update-invoice-adress.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    PayOrderService,
    UpdateShippingService,
    UpdateInvoiceAdressService,
  ],
})
export class OrderModule {}
