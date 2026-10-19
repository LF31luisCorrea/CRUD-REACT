import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMúsico from "../../contextos/contexto-músico";
import { estilizarBotãoRetornar, estilizarBotão, estilizarCard, estilizarCheckbox, estilizarDivCampo, 
  estilizarDivider, estilizarFlex, estilizarInlineFlex, estilizarInputText, estilizarLabel }
  from "../../utilitários/estilos";
export default function ConsultarEstudoInstrumento() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { estudoInstrumentoConsultado, estudoInstrumentoOrçamento, setDiretorEstudoInstrumento } = useContext(ContextoMúsico);
  const dados = { 
    nome_diretor: estudoInstrumentoConsultado?.diretor?.usuário?.nome
      || estudoInstrumentoOrçamento?.diretor?.usuário?.nome,
    título: estudoInstrumentoConsultado?.título || estudoInstrumentoOrçamento?.título,
    categoria: estudoInstrumentoConsultado?.categoria || estudoInstrumentoOrçamento?.categoria,
    data_início: estudoInstrumentoConsultado?.data_início || estudoInstrumentoOrçamento?.data_início,
    descrição: estudoInstrumentoConsultado?.descrição || estudoInstrumentoOrçamento?.descrição,
    desconto: estudoInstrumentoConsultado?.desconto
      || estudoInstrumentoOrçamento?.desconto,
    quantidade_aulas: estudoInstrumentoConsultado?.quantidade_aulas || estudoInstrumentoOrçamento?.quantidade_aulas, 
    valor_aula: estudoInstrumentoConsultado?.valor_aula || estudoInstrumentoOrçamento?.valor_aula
   };
  const navegar = useNavigate();  
  function consultarDiretorEstudoInstrumento() {
    if (estudoInstrumentoConsultado) setDiretorEstudoInstrumento(estudoInstrumentoConsultado.diretor);
    else setDiretorEstudoInstrumento(estudoInstrumentoOrçamento.diretor);
    navegar("../consultar-diretor");
  };
  function retornar() { 
    if (estudoInstrumentoConsultado) navegar("../pesquisar-estudos-instrumento");
    else if (estudoInstrumentoOrçamento) navegar("../cadastrar-orçamento");
  };
  return (
    <div className={estilizarFlex()}>
      <Card title="Consultar Estudo Instrumento" className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Diretor*:</label>
          <InputText name="nome_diretor"
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.nome_diretor} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Título*:</label>
          <InputText name="título" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.título} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Categoria*:</label>
          <InputText name="categoria"
          className={estilizarInputText(null, 200, usuárioLogado.cor_tema)}
          value={dados.categoria} disabled/>
        </div>    
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Início*:</label>
          <InputText name="data_início" type="date" value={dados.data_início} 
            className={estilizarInputText(null, usuárioLogado.cor_tema)} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição*:</label>
          <InputTextarea name="descrição" value={dados.descrição}
            className={estilizarInputText(null, 400, usuárioLogado.cor_tema)} autoResize disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Desconto*:</label>
          <Checkbox name="desconto" checked={dados.desconto}
            className={estilizarCheckbox(null)} autoResize disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Quantidade de Aulas*:</label>
          <InputText name="quantidade_aulas" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.quantidade_aulas} disabled/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Valor das aulas*:</label>
          <InputText name="valor_aula" className={estilizarInputText(null, 400, usuárioLogado.cor_tema)}
            value={dados.valor_aula} disabled/>
        </div>
    
        <Divider className={estilizarDivider()}/>
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={retornar}/>
          <Button className={estilizarBotão()} label="Diretor" onClick={consultarDiretorEstudoInstrumento}/>

        </div>
      </Card>
    </div>
  );
}