import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

@Entity("fine")
export default class Fine {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @ManyToOne("")
  book_id!: number;

  @ManyToOne("")
  user_id!: number;

  @Column()
  worth!: number;

  @Column()
  total!: number;
}
