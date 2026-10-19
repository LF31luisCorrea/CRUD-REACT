import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn }
from "typeorm";
import Usuário from "./usuário";
import Orçamento from "./orçamento";
export enum Instrumento { V = "Violino", C = "Clarinete", E = "Eufonio" };

@Entity()

export default class Músico extends BaseEntity {
    @PrimaryGeneratedColumn()
        id: number;
        @Column({ type: "enum", enum: Instrumento })
        instrumento: Instrumento;
        @Column()
        ano_início_aprendizado_música: number;
        @Column({ type: "date" })
        data_nascimento: Date;
        @Column()
        telefone: string;
        @OneToMany(() => Orçamento, (orçamento) => orçamento.músico)
        orçamentos: Orçamento[];
        @OneToOne(() => Usuário, usuário => usuário.músico, { onDelete: "CASCADE" })
        @JoinColumn()
        usuário: Usuário;
}