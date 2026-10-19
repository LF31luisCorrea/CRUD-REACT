import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMúsico from "../../contextos/contexto-músico";
import { estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, estilizarDivider, estilizarFlex,
  estilizarInlineFlex, estilizarInputText, estilizarLabel } from "../../utilitários/estilos";
export default function ConsultarDiretor() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { diretorEstudoInstrumento } = useContext(ContextoMúsico);
  const dados = { nome_diretor: diretorEstudoInstrumento?.usuário?.nome,
    tipo_músico: diretorEstudoInstrumento?.tipo_músico,
    anos_experiência_músico: diretorEstudoInstrumento?.anos_experiência_músico };
  const navegar = useNavigate();
  function retornarConsultarEstudoInstrumento() { navegar("/consultar-estudo-instrumento"); };
  return (
    <div className={estilizarFlex()}>
      <Card title="Consultar Diretor" className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Diretor*:</label>
          <InputText name="nome_diretor"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_diretor} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Tipo de Músico*:</label>
          <InputText name="tipo_músico"
            className={estilizarInputText(null, 150, usuárioLogado.cor_tema)}
            value={dados.tipo_músico} autoResize disabled/>    
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>
             Anos de Experiência Musical*:</label>
          <InputNumber name="anos_experiência_músico" size={5} 
              value={dados.anos_experiência_músico} 
              inputClassName={estilizarInputText(null, usuárioLogado.cor_tema)}
              mode="decimal" min={1} disabled/>
        </div>
        <Divider className={estilizarDivider(dados.cor_tema)}/>
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarConsultarEstudoInstrumento}/>
        </div>
      </Card>
    </div>
  );
};