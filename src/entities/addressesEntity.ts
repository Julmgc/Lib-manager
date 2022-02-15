import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Address {
  @PrimaryGeneratedColumn("uuid")
  uuidAddress!: string;

  @Column({ nullable: true })
  street!: string;

  @Column({ type: "int", nullable: true })
  streetNumber!: number;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  state!: string;

  @Column({ nullable: true })
  zipcode!: string;
}
