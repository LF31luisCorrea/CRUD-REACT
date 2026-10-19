import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 
"typeorm";
import Músico from "./músico";
import EstudoInstrumento from "./estudo-instrumento";
@Entity()
export default class Orçamento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    precisa_desconto: boolean;
    @Column()
    motivo: string;
    @ManyToOne(() => EstudoInstrumento, (estudoInstrumento) => estudoInstrumento.orçamentos, { onDelete: "CASCADE" })
    estudoInstrumento: EstudoInstrumento;
    @ManyToOne(() => Músico, (músico) => músico.orçamentos, { onDelete: "CASCADE" })
    músico: Músico;
}