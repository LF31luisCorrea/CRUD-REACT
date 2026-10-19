import { createContext, useState } from "react";
const ContextoMúsico= createContext();
export default ContextoMúsico;
export function ProvedorMúsico({ children }) {
const [orçamentoConsultado, setOrçamentoConsultado] = useState({});
const [estudoInstrumentoConsultado, setEstudoInstrumentoConsultado] = useState({});
const [estudoInstrumentoSelecionado, setEstudoInstrumentoSelecionado] = useState({});
const [estudoInstrumentoOrçamento, setEstudoInstrumentoOrçamento] = useState({});
const [diretorEstudoInstrumento, setDiretorEstudoInstrumento] = useState({});

return (
<ContextoMúsico.Provider value={{
 orçamentoConsultado, setOrçamentoConsultado, estudoInstrumentoConsultado, setEstudoInstrumentoConsultado, 
 estudoInstrumentoSelecionado, setEstudoInstrumentoSelecionado, estudoInstrumentoOrçamento, setEstudoInstrumentoOrçamento,diretorEstudoInstrumento, setDiretorEstudoInstrumento
 }}>{children}</ContextoMúsico.Provider>
 );
}