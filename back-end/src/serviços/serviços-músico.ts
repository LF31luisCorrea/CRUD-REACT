import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import Músico from '../entidades/músico';
import ServiçosUsuário from "./serviços-usuário";
import EstudoInstrumento from "../entidades/estudo-instrumento";
import Orçamento from "../entidades/orçamento"
export default class ServiçosMúsico { 
  constructor() {}
  static async cadastrarMúsico(request, response) {
    try {
      const { usuário_info, instrumento, ano_início_aprendizado_música, data_nascimento, telefone } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const músico = Músico.create({usuário, instrumento, ano_início_aprendizado_música, data_nascimento, telefone});
        await transactionManager.save(músico);
        await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) { return response.status(500).json({ erro: error }); }
  };
  static async atualizarMúsico(request, response) {
    try {
      const { cpf, instrumento, ano_início_aprendizado_música, data_nascimento, telefone } = request.body;
      const cpf_encriptado = md5(cpf);
      await Músico.update({ usuário: { cpf: cpf_encriptado } }, { instrumento, ano_início_aprendizado_música, 
        data_nascimento, telefone });
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : atualizarMúsico" }); }
  };
  static async buscarMúsico(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const músico = await Músico.findOne({ where: { usuário: cpf_encriptado },
        relations: ["usuário"] });
      if (!músico) return response.status(404).json({ erro: "Músico não encontrado." });
      return response.json({ nome: músico.usuário.nome, email: músico.usuário.email,
        instrumento: músico.instrumento,  ano_início_aprendizado_música: músico.ano_início_aprendizado_música,
        data_nascimento: músico.data_nascimento, telefone: músico.telefone });
    } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarMúsico" }); }
  };

  static async cadastrarOrçamento(request, response) {
    try {
      const { id_estudo_instrumento, precisa_desconto, motivo, cpf } = request.body;
      const cpf_encriptado = md5(cpf);
      const músico = await Músico.findOne({ where: { usuário: cpf_encriptado } });
      const estudoInstrumento = await EstudoInstrumento.findOne(id_estudo_instrumento);
      const orçamentos = await Orçamento.find({ where: { músico, estudoInstrumento }});
      if (orçamentos.length > 0) return response.status(404).json
        ({ erro: "O músico já cadastrou orçamentos para o estudo de instrumento." });
      await Orçamento.create({ precisa_desconto, motivo, músico, estudoInstrumento }).save();
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : cadastrarOrçamento" }); }
  };
  static async removerOrçamento(request, response) {
    try {
      const id = request.params.id;
      await Orçamento.delete(id);
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : removerOrçamento" }); }
  };
  static async buscarOrçamentosMúsico(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const orçamentos = await Orçamento.find({ where: { músico: { usuário: cpf_encriptado } },
        relations: ["músico", "músico.usuário", "estudoInstrumento", "estudoInstrumento.diretor", 
          "estudoInstrumento.diretor.usuário" ] });
      return response.json(orçamentos);
    } catch (error) { return response.status(500).json
       ({ erro: "Erro BD : buscarOrçamentosMúsico" }); }
  };
    static async buscarEstudosInstrumento(request, response) {
    try {
      const estudos_instrumento = await EstudoInstrumento.find({ relations: ["diretor", "diretor.usuário"] });
      return response.json(estudos_instrumento);
      } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarEstudosInstrumento" }); }
    };
}