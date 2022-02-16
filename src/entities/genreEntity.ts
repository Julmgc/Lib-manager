import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("genres")
export default class Genre {

    @PrimaryColumn()
    ddc!: string;

    @Column()
    description!: string;
}