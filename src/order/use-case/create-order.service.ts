import { OrderCreateDto } from '../dto/order-create.dto';
import { Order } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../article/entity/article.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';
export class CreateOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async createOrder(data: OrderCreateDto) {
    try {
      const order = new Order(data);
      return this.orderRepository.save(order);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order');
    }
  }
}