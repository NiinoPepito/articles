import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderUpdateShippingDto } from '../dto/order-update-shipping.dto';
import { OrderUpdateInvoiceAddressDto } from '../dto/order-update-invoice-address.dto';
import { OrderItemCreateDto } from '../dto/order-item-create.dto';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true})
  product: string;

  @Column({ type: 'int', nullable: true})
  quantity: number;

  @Column({ type: 'int', nullable: true })
  price: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  constructor(data: OrderItemCreateDto) {
    if (data) {
      this.product = data.product;
      this.quantity = data.quantity;
      this.price = data.price;
    }
  }
}
