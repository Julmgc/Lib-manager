import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import bcrypt from 'bcrypt';

// import { Andress } "./andressesEntity";

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    loaned_books!: number; 

    @Column()
    authorized: boolean;

    @Column()
    is_adm: boolean;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    // @ManyToOne(() => Andress, andress => andress.users)
    // andresses!: Andress;


    constructor(email: string, password: string, name: string, is_adm: boolean, authorized: boolean = true) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.is_adm = is_adm;
        this.authorized = authorized;
    }

}

