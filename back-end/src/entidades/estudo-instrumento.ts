import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Diretor from "./diretor";
import Orçamento from "./orçamento";
export enum Categoria { SOLO = "Solo", ORQUESTRA = "Orquestra", ENSINO_PROPRIO = "Ensino Próprio" };

@Entity()
export default class EstudoInstrumento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    título: string;
    @Column({ type: "enum", enum: Categoria })
    categoria: Categoria;
    @Column({ type: "date" })
    data_início: Date;
    @Column()
    descrição: string;
    @Column()
    desconto: boolean;
    @Column()
    quantidade_aulas: number;
    @Column()
    valor_aula: number;
    @ManyToOne(() => Diretor, (diretor) => diretor.estudosInstrumento, { onDelete: "CASCADE" })
    diretor: Diretor;
    @OneToMany(() => Orçamento, (orçamento) => orçamento.estudoInstrumento)
    orçamentos: Orçamento[];
}