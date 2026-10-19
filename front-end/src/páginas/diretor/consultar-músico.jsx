import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoDiretor from "../../contextos/contexto-diretor";
import { ANO_MÁSCARA, TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import {TAMANHOS, estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, estilizarDivider, 
  estilizarFlex, estilizarInlineFlex, estilizarInputMask, estilizarInputText, estilizarLabel }
  from "../../utilitários/estilos";
export default function ConsultarMúsico() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { músicoOrçamento } = useContext(ContextoDiretor);
  const dados = { nome: músicoOrçamento?.usuário?.nome, instrumento: músicoOrçamento?.instrumento,
    ano_início_aprendizado_música: músicoOrçamento?.ano_início_aprendizado_música,
    data_nascimento: músicoOrçamento?.data_nascimento,
    telefone: músicoOrçamento?.telefone };
  const navegar = useNavigate();
  function retornarConsultarOrçamento() { navegar("../consultar-orçamento"); };
  return (
    <div className={estilizarFlex()}>
      <Card title="Consultar Músico" className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Nome*:</label>
          <InputText name="nome" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Instrumento*:</label>
          <InputText name="instrumento" className={estilizarInputText(null, 300, usuárioLogado.cor_tema)}
            value={dados.instrumento} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Ano de início de aprendizado da música*:</label>
          <InputMask name="ano_início_aprendizado_música" autoClear size={TAMANHOS.ANO} mask={ANO_MÁSCARA} 
            value={dados.ano_início_aprendizado_música} 
            className={estilizarInputMask(null, usuárioLogado.cor_tema)} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Nascimento*:</label>
          <InputText name="data_nascimento" type="date" value={dados.data_nascimento} 
            className={estilizarInputText(null, usuárioLogado.cor_tema)} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(dados.cor_tema)}>Telefone*:</label>
          <InputMask name="telefone" autoClear size={TAMANHOS.TELEFONE} mask={TELEFONE_MÁSCARA}
            className={estilizarInputMask(null, dados.cor_tema)} value={dados.telefone} disabled/>
        </div>
        <Divider className={estilizarDivider(dados.cor_tema)}/>
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarConsultarOrçamento}/>
        </div>
      </Card>
    </div>
  );
};