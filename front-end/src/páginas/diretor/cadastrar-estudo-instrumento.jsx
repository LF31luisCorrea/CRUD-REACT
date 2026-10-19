import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoDiretor from "../../contextos/contexto-diretor";
import { serviçoAlterarEstudoInstrumento, serviçoCadastrarEstudoInstrumento, serviçoRemoverEstudoInstrumento } from "../../serviços/serviços-diretor";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
  from "../../utilitários/validações";
import { estilizarBotão, estilizarBotãoRemover, estilizarBotãoRetornar, estilizarCard, 
  estilizarCheckbox, estilizarDivCampo, estilizarDivider, estilizarDropdown, estilizarFlex, 
  estilizarInlineFlex, estilizarInputText, estilizarInputTextarea, estilizarLabel }
  from "../../utilitários/estilos";
export default function CadastrarEstudoInstrumento() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { estudoInstrumentoConsultado } = useContext(ContextoDiretor);
  const [dados, setDados] = useState({ título: estudoInstrumentoConsultado?.título || "",
    categoria: estudoInstrumentoConsultado?.categoria || "",
    data_início: estudoInstrumentoConsultado?.data_início || "",
    descrição: estudoInstrumentoConsultado?.descrição || "",
    desconto: estudoInstrumentoConsultado?.desconto || "",
    quantidade_aulas: estudoInstrumentoConsultado?.quantidade_aulas || "",
    valor_aula: estudoInstrumentoConsultado?.valor_aula || "" });
  const [listaÁreasAtuação, setListaÁreasAtuação] = useState([]);
  const [erros, setErros] = useState({});
  const navegar = useNavigate();
  const opçõesCategoria = [{ label: "Solo", value: "Solo" },
    { label: "Orquestra", value: "Orquestra" },
    { label: "Ensino Próprio", value: "Ensino Próprio" }];
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value || event.checked;
    setDados({ ...dados, [chave]: valor });
  };
  function validarCampos() {
    const { título, categoria, data_início, descrição, quantidade_aulas, valor_aula } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({ título, categoria, 
      data_início, descrição, quantidade_aulas, valor_aula });
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  };
  function retornarAdministrarEstudosInstrumento() { navegar("../administrar-estudos-instrumento"); };
  async function cadastrarEstudoInstrumento() {
    if (validarCampos()) {
      try {
        await serviçoCadastrarEstudoInstrumento({ ...dados, cpf: usuárioLogado.cpf });
        mostrarToast(referênciaToast, "Estudo de Instrumento cadastrado com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    }
  };
  async function alterarEstudoInstrumento() {
    if (validarCampos()) {
      try {
        await serviçoAlterarEstudoInstrumento({ ...dados, id: estudoInstrumentoConsultado.id });
        mostrarToast(referênciaToast, "Estudo Instrumento alterado com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    }
  };
  
  async function removerEstudoInstrumento() {
    try {
      await serviçoRemoverEstudoInstrumento(estudoInstrumentoConsultado.id);
      mostrarToast(referênciaToast, "Estudo Instrumento excluída com sucesso!", "sucesso");
    } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
  };
  function BotõesAções() {
    if (estudoInstrumentoConsultado) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarAdministrarEstudosInstrumento}/>
          <Button className={estilizarBotãoRemover()} label="Remover" onClick={removerEstudoInstrumento}/>
          <Button className={estilizarBotão()} label="Alterar" onClick={alterarEstudoInstrumento}/>
          <Button className={estilizarBotão()} label="Orçamentos" onClick={mostrarOrçamentos}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" 
             onClick={retornarAdministrarEstudosInstrumento}/>
          <Button className={estilizarBotão()} label="Cadastrar" onClick={cadastrarEstudoInstrumento}/>
        </div>
      );
    }
  };

  function mostrarOrçamentos() { navegar("../pesquisar-orçamentos"); };

  function títuloFormulário() {
    if (estudoInstrumentoConsultado) return "Alterar Estudo Instrumento";
    else return "Cadastrar Estudo Instrumento";
  };

  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} onHide={retornarAdministrarEstudosInstrumento} position="bottom-center"/>
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Título*:</label>
          <InputText name="título"
            className={estilizarInputText(erros.título, 400, usuárioLogado.cor_tema)}
            value={dados.título} onChange={alterarEstado}/>
          <MostrarMensagemErro mensagem={erros.título}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Categoria*:</label>
          <Dropdown name="categoria"
            className={estilizarDropdown(erros.categoria, usuárioLogado.cor_tema)}
            value={dados.categoria} options={opçõesCategoria} onChange={alterarEstado} 
            placeholder="-- Selecione --"/>
          <MostrarMensagemErro mensagem={erros.categoria}/>
        </div>
      
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Início*:</label>

          <InputText name="data_início" type="date" value={dados.data_início} 
            className={estilizarInputText(erros.data_início, usuárioLogado.cor_tema)}
            onChange={alterarEstado}/>
          <MostrarMensagemErro mensagem={erros.data_início}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Descrição*:</label>
          <InputTextarea name="descrição" value={dados.descrição}
            className={estilizarInputTextarea(erros.descrição, usuárioLogado.cor_tema)} 
            onChange={alterarEstado} autoResize cols={40}/>
          <MostrarMensagemErro mensagem={erros.descrição}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}> Desconto*:</label>
          <Checkbox name="desconto" checked={dados.desconto}
            className={estilizarCheckbox()} onChange={alterarEstado} autoResize/>
        </div>
        <div className={estilizarDivCampo()}>
           <label className={estilizarLabel(usuárioLogado.cor_tema)}>Quantidade de Aulas*:</label>
            <InputText name="quantidade_aulas" type="number" value={dados.quantidade_aulas} 
            className={estilizarInputText(erros.quantidade_aulas,usuárioLogado.cor_tema)}
            onChange={alterarEstado}/>
            <MostrarMensagemErro mensagem={erros.quantidade_aulas}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Valor da Aula*:</label>
          <InputText name="valor_aula" type="number" step="0.01" value={dados.valor_aula}
            className={estilizarInputText( erros.valor_aula, usuárioLogado.cor_tema)}onChange={alterarEstado}/>
          <MostrarMensagemErro mensagem={erros.valor_aula}/>
        </div>
       
        <Divider className={estilizarDivider()}/>
        <BotõesAções/>
      </Card>
    </div>
  );
}