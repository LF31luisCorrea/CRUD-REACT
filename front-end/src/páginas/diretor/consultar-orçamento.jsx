import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoDiretor from "../../contextos/contexto-diretor";
import { estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarCheckbox, 
  estilizarDivCampo, estilizarDivider, estilizarFlex, estilizarInlineFlex, estilizarInputText, 
  estilizarLabel } from "../../utilitários/estilos";
export default function ConsultarOrçamento() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { orçamentoConsultado, setMúsicoOrçamento } = useContext(ContextoDiretor);
  const dados = { nome_músico: orçamentoConsultado?.músico?.usuário?.nome,
    precisa_desconto: orçamentoConsultado?.precisa_desconto,
    motivo: orçamentoConsultado?.motivo,
    título_estudo_instrumento: orçamentoConsultado?.estudoInstrumento.título };
  const navegar = useNavigate();
  function retornarPesquisarOrçamentos() { navegar("../pesquisar-orçamentos"); };
  function consultarMúsicoOrçamento() {
    setMúsicoOrçamento(orçamentoConsultado.músico);
    navegar("../consultar-músico");
  };
  return (
    <div className={estilizarFlex()}>
      <Card title="Consultar Orçamento" className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Músico*:</label>
          <InputText name="nome_músico"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_músico} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Precisa de Desconto*:</label>
          <Checkbox name="precisa_desconto" checked={dados.precisa_desconto}
            className={estilizarCheckbox()} autoResize disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Motivo*:</label>
          <InputTextarea name="motivo"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.motivo} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Estudo do Instrumento*</label>
          <InputText name="título_estudo_instrumento"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.título_estudo_instrumento} disabled/>
        </div>
        <Divider className={estilizarDivider()}/>
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarPesquisarOrçamentos}/>
          <Button className={estilizarBotão()} label="Músico" onClick={consultarMúsicoOrçamento}/>
        </div>
      </Card>
    </div>
  );
}