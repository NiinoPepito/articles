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

  @Column({ type: 'date' , nullable: true})
  paidAt: Date;

  @Column({ type: 'varchar' })
  customer: string;

  @Column({ type: 'json' })
  items: string[];

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int' })
  total: number;
  constructor(createOrderData?: OrderCreateDto) {
    if (createOrderData) {
      if (createOrderData.items.length > 3) {
        throw new Error('Le nombre d\'items ne peut pas dépasser trois.');
      }
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.paidAt = null;
      this.status = 'En attente';
      this.customer = createOrderData.customer;
      this.items = createOrderData.items;
      this.total = 10 * createOrderData.items.length;
    }
  }

  pay() {
    this.paidAt = new Date();
    this.status = 'Payé';
    this.updatedAt = new Date();
  }
}
