import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from "../entity/order.entity";

Injectable();
export class PayOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async payOrder(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    order.pay();
    await this.orderRepository.save(order);

    return order;
  }
}