import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderCreateDto } from "../dto/order-create.dto";
import { ShippingUpdateDto } from "../dto/shipping-update.dto";
import { InvoiceAdressUpdateDto } from "../dto/invoice-adress-update.dto";

enum OrderStatus {
  CREATED = 'Créée',
  PAID = 'Payée',
  CANCELED = 'Annulée'
}
// enum ShippingMethod {
//   STANDARD = 'Standard',
//   EXPRESS = 'Express',
// }

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

  constructor(createOrderData?: OrderCreateDto) {
    if (createOrderData) {
      if (createOrderData.items.length > 3) {
        throw new Error('Le nombre d\'items ne peut pas dépasser trois.');
      }
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.paidAt = null;
      this.status = OrderStatus.CREATED;
      this.customer = createOrderData.customer;
      this.items = createOrderData.items;
      this.total = 10 * createOrderData.items.length;
      this.shippingAddress = null;
      this.shippingMethod = null;
      this.invoiceAddress = null;
      this.shippingMethodSetAt = null;
      this.invoiceAddressSetAt = null;
    }
  }

  pay() {
    if (this.status !== OrderStatus.CREATED) {
      throw new Error('L\'order n\'est pas en cours de création');
    }
    this.paidAt = new Date();
    this.status = OrderStatus.PAID;
    this.updatedAt = new Date();
  }

  updateShippingAdress(data : ShippingUpdateDto) {
    if (
      this.status !== OrderStatus.CREATED &&
      this.status !== OrderStatus.PAID
    ) {
      throw new Error('L\'order n\'est pas en cours de création ou payée');
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

  updateInvoiceAddress(data : InvoiceAdressUpdateDto) {
    if (
      this.status !== OrderStatus.CREATED &&
      this.status !== OrderStatus.PAID
    ) {
      throw new Error('L\'order n\'est pas en cours de création ou payée');
    }
    this.invoiceAddress = data.invoiceAdress;
    this.invoiceAddressSetAt = new Date();
    this.updatedAt = new Date();
  }
}
