import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilDiretor from "../middlewares/verificar-perfil-diretor";
import ServiçosDiretor from "../serviços/serviços-diretor";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";
const RotasDiretor = Router();
export default RotasDiretor;
RotasDiretor.post("/", ServiçosDiretor.cadastrarDiretor);
RotasDiretor.get("/:cpf", verificarToken, verificarPerfilDiretor,  
    ServiçosDiretor.buscarDiretor);
RotasDiretor.patch("/", verificarToken, verificarPerfilDiretor, 
   ServiçosDiretor.atualizarDiretor);
RotasDiretor.post("/estudos-instrumento", verificarToken, verificarPerfilDiretor, 
  ServiçosDiretor.cadastrarEstudoInstrumento);
RotasDiretor.patch("/estudos-instrumento", verificarToken, verificarPerfilDiretor, 
  ServiçosDiretor.alterarEstudoInstrumento);
RotasDiretor.delete("/estudos-instrumento/:id", verificarToken, verificarPerfilDiretor, 
  ServiçosDiretor.removerEstudoInstrumento);
RotasDiretor.get("/estudos-instrumento/diretor/:cpf", verificarToken, verificarPerfilDiretor, 
  verificarErroConteúdoToken, ServiçosDiretor.buscarEstudosInstrumentoDiretor);
RotasDiretor.get("/orcamentos/:id_estudo_instrumento", verificarToken, verificarPerfilDiretor,
 ServiçosDiretor.buscarOrçamentosEstudoInstrumento);