import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("genres")
export class GenreEntity {

    @PrimaryColumn()
    ddc!: string;

    @Column()
    description!: string;
}