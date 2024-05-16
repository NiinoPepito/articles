import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from "./entity/order.entity";
import { OrderController } from "./controller/order.controller";
import { CreateOrderService } from "./use-case/create-order.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [CreateOrderService,
  ],
})
export class OrderModule {}
