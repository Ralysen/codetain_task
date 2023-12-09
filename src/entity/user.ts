import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import * as bcrypt from "bcrypt";
@Entity()
@Unique(['name'])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }

}