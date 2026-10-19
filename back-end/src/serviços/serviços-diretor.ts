import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import Diretor from "../entidades/diretor";
import ServiçosUsuário from "./serviços-usuário";
import EstudoInstrumento from "../entidades/estudo-instrumento";
import Orçamento from "src/entidades/orçamento";

export default class ServiçosDiretor {
  constructor() {}
  static async cadastrarDiretor(request, response) {
     try {
      const { usuário_info, tipo_músico, anos_experiência_músico } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(usuário_info);
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const diretor = Diretor.create({ usuário, tipo_músico, anos_experiência_músico});
        await transactionManager.save(diretor);
        await transactionManager.update(Usuário, usuário.cpf, { status: Status.ATIVO });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) { 
      return response.status(500).json({ erro: error }); 
    }
  };
  static async buscarDiretor(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const diretor = await Diretor.findOne({ where: { usuário: cpf_encriptado }, relations: ["usuário"] });
      if (!diretor) return response.status(404).json({ erro: "Diretor não encontrado." });
      return response.json({ nome: diretor.usuário.nome, email: diretor.usuário.email,
        tipo_músico: diretor.tipo_músico,
        anos_experiência_músico: diretor.anos_experiência_músico });
    } catch (error) { return response.status(500).json({ erro: "Erro BD : buscarDiretor" }); }
  };

    static async atualizarDiretor(request, response) {
    try {
      const { cpf, tipo_músico, anos_experiência_músico } = request.body;
      const cpf_encriptado = md5(cpf);
      await Diretor.update({ usuário: { cpf: cpf_encriptado } },
        { tipo_músico, anos_experiência_músico });
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : atualizarDiretor" }); }
  };

   static async cadastrarEstudoInstrumento (request, response) {
    try {
      const {título, categoria, data_início, descrição, desconto, quantidade_aulas, valor_aula, 
        cpf} = request.body;
      const cpf_encriptado = md5(cpf);
      const diretor = await Diretor.findOne({ where: { usuário: cpf_encriptado },
        relations: ["usuário" ] });
      await EstudoInstrumento.create({título, categoria, data_início, descrição, 
        desconto, quantidade_aulas, valor_aula, diretor}).save();
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : cadastrarEstudoInstrumento" }); }
  };
  static async alterarEstudoInstrumento(request, response) {
    try {
      const {id, título, categoria, data_início, descrição, desconto, 
        quantidade_aulas, valor_aula} = request.body;
      await EstudoInstrumento.update(id, {título, categoria, data_início, descrição, 
        desconto, quantidade_aulas, valor_aula});
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : alterarEstudoInstrumento" }); }
  };
  static async removerEstudoInstrumento(request, response) {
    try {
      const id_estudo_instrumento = request.params.id;
      const estudo_instrumento = await EstudoInstrumento.findOne(id_estudo_instrumento);
      await EstudoInstrumento.remove(estudo_instrumento);
      return response.json();
    } catch (error) { return response.status(500).json({ erro: "Erro BD : removerEstudoInstrumento" }); }
  };
  static async buscarOrçamentosEstudoInstrumento(request, response) {
    try {
      const id_estudo_instrumento = request.params.id_estudo_instrumento;
      const orcamentos = await Orçamento.find({ where: { estudoInstrumento: { id: id_estudo_instrumento } },
      relations: ["músico", "músico.usuário", "estudoInstrumento"]});
      return response.json(orcamentos);
      } catch (error) { return response.status(500).json( 
      { erro: "Erro BD : buscarOrçamemtoEstudoinstrumento" }); }
  };
  static async buscarEstudosInstrumentoDiretor(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const estudos_instrumento = await EstudoInstrumento.find({ where: { diretor: { usuário: cpf_encriptado } },
     relations: ["diretor", "diretor.usuário"] });
      return response.json(estudos_instrumento);
    } catch (error) { return response.status(500).json
       ({ erro: "Erro BD : buscarEstudosInstrumentoDiretor" }); }
  };
};

