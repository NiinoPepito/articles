import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from "../dto/order-create.dto";

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date'})
  updatedAt: Date;

  @Column({ type: 'varchar' })
  customer: string;

  @Column({ type: 'json' })
  items: JSON;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int' })
  total: number;
  constructor(createOrderData?: OrderCreateDto) {
    if (createOrderData) {
      if (Object.keys(createOrderData.items).length > 3) {
        throw new Error('Le nombre d\'items ne peut pas dépasser trois.');
      }
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.customer = createOrderData.customer;
      this.items = createOrderData.items;
      this.total = 10 * Object.keys(createOrderData.items).length;
    }
  }
}
