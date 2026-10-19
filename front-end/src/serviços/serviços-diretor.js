import servidor from "./servidor";

export function serviçoCadastrarDiretor(diretor)
   { return servidor.post("/diretores", diretor); };
export function serviçoBuscarDiretor(cpf) { return servidor.get(`/diretores/${cpf}`); };
export function serviçoAtualizarDiretor(diretor)
{ return servidor.patch("/diretores", diretor); };

export function serviçoCadastrarEstudoInstrumento(estudoInstrumento) { 
return servidor.post("/diretores/estudos-instrumento", estudoInstrumento); };
export function serviçoAlterarEstudoInstrumento(estudoInstrumento) {
  return servidor.patch("/diretores/estudos-instrumento", estudoInstrumento); };
export function serviçoRemoverEstudoInstrumento(id) {
  return servidor.delete(`/diretores/estudos-instrumento/${id}`); };
export function serviçoBuscarEstudosInstrumentoDiretor(cpf) {
  return servidor.get(`/diretores/estudos-instrumento/diretor/${cpf}`); };
export function serviçoBuscarOrçamentosEstudoInstrumento(id_estudo_instrumento) {
return servidor.get(`/diretores/orcamentos/${id_estudo_instrumento}`); };

