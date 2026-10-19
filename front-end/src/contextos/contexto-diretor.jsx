import { createContext, useState } from "react";
const ContextoDiretor = createContext();
export default ContextoDiretor;
export function ProvedorDiretor({ children }) {
const [estudoInstrumentoConsultado, setEstudoInstrumentoConsultado] = useState({});
const [orçamentoConsultado, setOrçamentoConsultado] = useState(null);
const [músicoOrçamento, setMúsicoOrçamento] = useState(null);
return (
<ContextoDiretor.Provider value={{ estudoInstrumentoConsultado, setEstudoInstrumentoConsultado, orçamentoConsultado, setOrçamentoConsultado, músicoOrçamento, setMúsicoOrçamento
 }}>{children}</ContextoDiretor.Provider>
 );
}