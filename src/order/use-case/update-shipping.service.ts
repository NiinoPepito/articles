import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { ShippingUpdateDto } from '../dto/shipping-update.dto';

Injectable();
export class UpdateShippingService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async updateShippingAdress(id: number, data: ShippingUpdateDto) {
    const order = await this.orderRepository.findOneBy({ id });
    order.updateShippingAdress(data);
    return await this.orderRepository.save(order);
  }
}