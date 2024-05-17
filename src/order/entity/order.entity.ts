import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderCreateDto } from '../dto/order-create.dto';
import { ShippingUpdateDto } from '../dto/shipping-update.dto';
import { InvoiceAdressUpdateDto } from '../dto/invoice-adress-update.dto';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  static OrderStatus = {
    Cart: 'Cart',
    Paid: 'Paid',
    ShippingSet: 'ShippingSet',
    InvoiceSet: 'InvoiceSet',
    Cancelled: 'Cancelled',
  };

  constructor(data?: OrderCreateDto) {
    if (data) {
      if (data.items.length > 3) {
        throw new Error("Le nombre d'items ne peut pas dépasser trois.");
      }
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.paidAt = null;
      this.status = Order.OrderStatus.Cart;
      this.customer = data.customer;
      this.items = [];
      this.items = [];
      for (const item of data.items) {
        const itemSave = new OrderItem(item);

        let exist = false;
        for (const orderItem of this.items) {
          if (orderItem.product == itemSave.product) {
            orderItem.incrementQuantity();
            this.total += orderItem.price;
            exist = true;
          }
        }
        if (!exist){
          this.items.push(itemSave);
          this.total += itemSave.price;
          this.updatedAt = new Date();
        }
      }

      this.total = 10 * data.items.length;
      this.shippingAddress = null;
      this.shippingMethod = null;
      this.invoiceAddress = null;
      this.shippingMethodSetAt = null;
      this.invoiceAddressSetAt = null;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' })
  updatedAt: Date;

  @Column({ type: 'date', nullable: true })
  paidAt: Date;

  @Column({ type: 'varchar' })
  customer: string;

  @OneToMany(() => OrderItem, (order) => order.id, {
    nullable: true,
    cascade: true,
  })
  items: OrderItem[];

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int' })
  total: number;

  @Column({ type: 'varchar', nullable: true })
  shippingAddress: string;

  @Column({ type: 'varchar', nullable: true })
  shippingMethod: string;

  @Column({ type: 'varchar', nullable: true })
  invoiceAddress: string;

  @Column({ type: 'date', nullable: true })
  shippingMethodSetAt: Date;

  @Column({ type: 'date', nullable: true })
  invoiceAddressSetAt: Date;

  pay() {
    if (this.status !== Order.OrderStatus.Cart) {
      throw new Error("L'order n'est pas en cours de création");
    }
    this.paidAt = new Date();
    this.status = Order.OrderStatus.Paid;
    this.updatedAt = new Date();
  }

  updateShippingAdress(data: ShippingUpdateDto) {
    if (
      this.status !== Order.OrderStatus.Cart ||
      this.status !== Order.OrderStatus.Paid
    ) {
      throw new Error("L'order n'est pas en cours de création ou payée");
    }
    if (
      this.status != Order.OrderStatus.InvoiceSet ||
      this.status != Order.OrderStatus.ShippingSet
    ) {
      this.status = Order.OrderStatus.ShippingSet;
    }
    this.shippingAddress = data.shippingAddress;
    this.shippingMethod = data.shippingMethod;
    this.shippingMethodSetAt = new Date();
    this.updatedAt = new Date();
    if (this.invoiceAddress == null) {
      this.invoiceAddress = data.shippingAddress;
      this.invoiceAddressSetAt = new Date();
    }
  }

  updateInvoiceAddress(data: InvoiceAdressUpdateDto) {
    if (
      this.status !== Order.OrderStatus.Cart ||
      this.status !== Order.OrderStatus.Paid
    ) {
      throw new Error("L'order n'est pas en cours de création ou payée");
    }
    if (this.status != Order.OrderStatus.InvoiceSet) {
      this.status = Order.OrderStatus.InvoiceSet;
    }
    this.invoiceAddress = data.invoiceAdress;
    this.invoiceAddressSetAt = new Date();
    this.updatedAt = new Date();
  }
}
