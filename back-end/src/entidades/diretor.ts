import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 
"typeorm";
import Usuário from "./usuário";
import EstudoInstrumento from "./estudo-instrumento";
export enum Tipo_músico {ORQUESTRA = "orquestra", SOLO = "solo"};
@Entity()

export default class Diretor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "enum", enum: Tipo_músico })
  tipo_músico: Tipo_músico;
  @Column()
  anos_experiência_músico: number;
  @OneToMany(() => EstudoInstrumento, (estudoInstrumento) => estudoInstrumento.diretor)
  estudosInstrumento: EstudoInstrumento[];
  @OneToOne(() => Usuário, (usuário) => usuário.diretor, { onDelete: "CASCADE" })
  @JoinColumn()
   usuário: Usuário;
}