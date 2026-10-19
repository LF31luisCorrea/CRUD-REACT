import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMúsico from "../../contextos/contexto-músico";
import { serviçoCadastrarOrçamento, serviçoRemoverOrçamento } from "../../serviços/serviços-músico";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
  from "../../utilitários/validações";
import { estilizarBotão, estilizarBotãoRetornar, estilizarBotãoRemover, estilizarCard, 
  estilizarCheckbox, estilizarDivCampo, estilizarDivider, estilizarFlex, estilizarInlineFlex, 
  estilizarInputText, estilizarInputTextarea, estilizarLabel } from "../../utilitários/estilos";
export default function CadastrarOrçamento() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { orçamentoConsultado, estudoInstrumentoSelecionado, setEstudoInstrumentoOrçamento, setEstudoInstrumentoConsultado
 } = useContext(ContextoMúsico);
  const [dados, setDados] = useState({ id_estudo_instrumento: estudoInstrumentoSelecionado?.id || "",
    precisa_desconto: orçamentoConsultado?.precisa_desconto || "",
    motivo: orçamentoConsultado?.motivo || "" });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();
  
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  };
  function validarCampos() {
    const { motivo } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({ motivo });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  };
  function consultarEstudoInstrumentoOrçamento() {
    setEstudoInstrumentoConsultado(null);
    setEstudoInstrumentoOrçamento(orçamentoConsultado?.estudoInstrumento);
    navegar("../consultar-estudo-instrumento");
  };
  function estudoInstrumentoLabel() {
    if (orçamentoConsultado?.título_orçamento || estudoInstrumentoSelecionado)
       return "Estudo Instrumento Selecionado*:";
    else return "Selecione um Estudo de instrumento*:";
  };
  function pesquisarEstudosInstrumento() { navegar("../pesquisar-estudos-instrumento"); };
  function retornarAdministrarOrçamentos() { navegar("../administrar-orçamentos"); };
  async function cadastrarOrçamento() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarOrçamento({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(referênciaToast, "Orçamento cadastrado com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
    }
  };
  
  async function removerOrçamento() {
    try {
      await serviçoRemoverOrçamento(orçamentoConsultado.id);
      mostrarToast(referênciaToast, "Orçamento removido com sucesso!", "sucesso");
    } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
  };
  function BotõesAções() {
    if (orçamentoConsultado) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotão()} label="EstudoInstrumento" onClick={consultarEstudoInstrumentoOrçamento}/>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarAdministrarOrçamentos}/>
          <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerOrçamento}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarAdministrarOrçamentos}/>
          <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarOrçamento}/>
        </div>
      );
    }
  };
  function títuloFormulário() {
    if (orçamentoConsultado) return "Remover Orçamento";
    else return "Cadastrar Orçamento";
  };
  function EstudoInstrumentoInputText() {
    if (estudoInstrumentoSelecionado?.título) {
      return <InputText name="título_estudo_instrumento"
        className={estilizarInputText(erros.título_estudo_instrumento, 400, usuárioLogado.cor_tema)}
        value={estudoInstrumentoSelecionado?.título} disabled/>
    } else if (orçamentoConsultado?.estudoInstrumento?.título) {
      return <InputText name="título_estudo_instrumento"
        className={estilizarInputText(erros.título_estudo_instrumento, 400, usuárioLogado.cor_tema)}
        value={orçamentoConsultado?.estudoInstrumento?.título} disabled/>
    } else return null;
  };
  function BotãoSelecionar() {
    if (!estudoInstrumentoSelecionado && !orçamentoConsultado) {
      return <Button className={estilizarBotão()} label="Selecionar" onClick={pesquisarEstudosInstrumento}/>
    } else if (estudoInstrumentoSelecionado) {
      return <Button className={estilizarBotão()} label="Substituir" onClick={pesquisarEstudosInstrumento}/>;
    } else return null;
  }; 
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} onHide={retornarAdministrarOrçamentos} position="bottom-center"/>
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>{estudoInstrumentoLabel()}</label>
          <BotãoSelecionar/>
          <EstudoInstrumentoInputText/>
          <MostrarMensagemErro mensagem={erros.id}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Precisa de desconto*:</label>
          <Checkbox name="precisa_desconto" checked={dados.precisa_desconto}
            className={estilizarCheckbox()} onChange={alterarEstado} autoResize/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>motivo*:</label>
          <InputTextarea name="motivo" value={dados.motivo}
            className={estilizarInputTextarea(erros.descrição, usuárioLogado.cor_tema)} 
            onChange={alterarEstado} autoResize cols={40}/>
          <MostrarMensagemErro mensagem={erros.motivo}/>
        </div>
        <Divider className={estilizarDivider()}/>
        <BotõesAções/>
      </Card>
    </div>
  );
}
