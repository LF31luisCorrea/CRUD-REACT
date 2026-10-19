import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilMúsico from "../middlewares/verificar-perfil-músico";
import ServiçosMúsico from "../serviços/serviços-músico";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";
const RotasMúsico = Router();
export default RotasMúsico;
RotasMúsico.post("/", ServiçosMúsico.cadastrarMúsico);
RotasMúsico.patch("/", verificarToken, verificarPerfilMúsico, ServiçosMúsico.atualizarMúsico);
RotasMúsico.get("/:cpf", verificarToken, verificarPerfilMúsico, ServiçosMúsico.buscarMúsico);
RotasMúsico.post("/orcamentos/", verificarToken, verificarPerfilMúsico, 
  ServiçosMúsico.cadastrarOrçamento);
RotasMúsico.delete("/orcamentos/:id", verificarToken, verificarPerfilMúsico, 
  ServiçosMúsico.removerOrçamento);
RotasMúsico.get("/orcamentos/musico/:cpf", verificarToken, verificarPerfilMúsico, 
  verificarErroConteúdoToken, ServiçosMúsico.buscarOrçamentosMúsico);
RotasMúsico.get("/orcamentos/estudos-instrumento/", verificarToken, verificarPerfilMúsico,     
  ServiçosMúsico.buscarEstudosInstrumento);