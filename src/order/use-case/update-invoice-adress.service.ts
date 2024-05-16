import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { InvoiceAdressUpdateDto } from '../dto/invoice-adress-update.dto';

Injectable();
export class UpdateInvoiceAdressService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async updateInvoiceAdress(id: number, data: InvoiceAdressUpdateDto) {
    const order = await this.orderRepository.findOneBy({ id });
    order.updateInvoiceAddress(data);
    await this.orderRepository.save(order);
    return order;
  }
}