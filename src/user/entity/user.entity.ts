import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' , nullable: true})
  age: number;

  @Column({ type: 'varchar' , nullable: true})
  birthdayCity: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

}
