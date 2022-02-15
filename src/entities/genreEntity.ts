import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("genres")
export class Genre {

    @PrimaryColumn()
    ddc!: string;

    @Column()
    description!: string;
}