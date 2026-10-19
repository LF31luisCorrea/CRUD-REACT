import servidor from "./servidor";
export function serviçoCadastrarMúsico(músico) { return servidor.post("/musicos", músico); };
export function serviçoAtualizarMúsico(músico) { return servidor.patch("/musicos", músico); };
export function serviçoBuscarMúsico(cpf) { return servidor.get(`/musicos/${cpf}`);}; 

export function serviçoCadastrarOrçamento(orçamento) {
return servidor.post("/musicos/orcamentos", orçamento); };
export function serviçoRemoverOrçamento(id) { return servidor.delete(`/musicos/orcamentos/${id}`); };
export function serviçoBuscarOrçamentosMúsico(cpf) {
  return servidor.get(`/musicos/orcamentos/musico/${cpf}`); };
export function serviçoBuscarEstudosInstrumento() { return servidor.get("/musicos/orcamentos/estudos-instrumento"); };