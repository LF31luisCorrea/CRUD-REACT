import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { ANO_MÁSCARA, TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import { serviçoCadastrarMúsico, serviçoAtualizarMúsico, serviçoBuscarMúsico }
  from "../../serviços/serviços-músico";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios }
  from "../../utilitários/validações";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, 
  estilizarDivider, estilizarDropdown, estilizarFlex, estilizarInlineFlex, estilizarInputMask,   
  estilizarInputText, estilizarLabel } from "../../utilitários/estilos";
export default function CadastrarMúsico() {
  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({ instrumento: "", ano_início_aprendizado_música: "", data_nascimento: "",
    telefone: "" });
  const [erros, setErros] = useState({});
  const [cpfExistente, setCpfExistente] = useState(false);
  const navegar = useNavigate();
  const opçõesInstrumento = [{ label: "Violino", value: "Violino" },
    { label: "Clarinete", value: "Clarinete" }, { label: "Eufônio", value: "Eufônio" }];
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    const valor = event.target.value;
    setDados({ ...dados, [chave]: valor });
  };
  function validarCampos() {
    let errosCamposObrigatórios;
    errosCamposObrigatórios = validarCamposObrigatórios(dados);
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  };
  function títuloFormulário() {
    if (usuárioLogado?.cadastrado) return "Alterar Músico";
    else return "Cadastrar Músico";
  };
  async function cadastrarMúsico() {
    if (validarCampos()) {
      try {
        const response = await serviçoCadastrarMúsico({ ...dados, usuário_info: usuárioLogado,
          instrumento: dados.instrumento, ano_início_aprendizado_música: dados.ano_início_aprendizado_música,
          data_nascimento: dados.data_nascimento, telefone: dados.telefone });
        if (response.data)
          setUsuárioLogado(usuário => ({ ...usuário, status: response.data.status,
            token: response.data.token }));
        mostrarToast(referênciaToast, "Músico cadastrado com sucesso!", "sucesso");
      } catch (error) {
        setCpfExistente(true);
        mostrarToast(referênciaToast, error.response.data.erro, "erro"); 
      }
    }
  };
  async function atualizarMúsico() {
    if (validarCampos()) {
      try {
        const response = await serviçoAtualizarMúsico({ ...dados, cpf: usuárioLogado.cpf });
        if (response) mostrarToast(referênciaToast, "Músico atualizado com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
    }
  };
  function labelBotãoSalvar() {
    if (usuárioLogado?.cadastrado) return "Alterar";
    else return "Cadastrar";
  };
  function açãoBotãoSalvar() {
    if (usuárioLogado?.cadastrado) atualizarMúsico();
    else cadastrarMúsico();
  };
   function redirecionar() {
    if (cpfExistente) {
      setUsuárioLogado(null);
      navegar("/criar-Usuário");
    } else {
      setUsuárioLogado(usuárioLogado => ({ ...usuárioLogado, cadastrado: true }));
      navegar("/pagina-inicial");
    }
  };
  useEffect(() => {
    let desmontado = false;
    async function buscarDadosMúsico() {
      try {
        const response = await serviçoBuscarMúsico(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setDados(dados => ({ ...dados, instrumento: response.data.instrumento,
            ano_início_aprendizado_música: response.data.ano_início_aprendizado_música,
            data_nascimento: response.data.data_nascimento, telefone: response.data.telefone }));
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    if (usuárioLogado?.cadastrado) buscarDadosMúsico();
    return () => desmontado = true;
  }, [usuárioLogado?.cadastrado, usuárioLogado.cpf]);
  return (
    <div className={estilizarFlex()}>
    <Toast ref={referênciaToast} onHide={redirecionar} position="bottom-center"/>
    <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>
      <div className={estilizarDivCampo()}>
        <label className={estilizarLabel(usuárioLogado.cor_tema)}>Instrumento*:</label>
        <Dropdown name="instrumento" className={estilizarDropdown(erros.instrumento, usuárioLogado.cor_tema)}
            value={dados.instrumento} options={opçõesInstrumento} onChange={alterarEstado}
            placeholder="-- Selecione --"/>        
        <MostrarMensagemErro mensagem={erros.instrumento}/>
      </div>
      <div className={estilizarDivCampo()}>
        <label className={estilizarLabel(usuárioLogado.cor_tema)}>Ano de início de aprendizado na Música*:</label>
        <InputMask name="ano_início_aprendizado_música" autoClear size={TAMANHOS.ANO} onChange={alterarEstado}
          className={estilizarInputMask(erros.ano_início_aprendizado_música, usuárioLogado.cor_tema)}
          mask={ANO_MÁSCARA} value={dados.ano_início_aprendizado_música}/>
        <MostrarMensagemErro mensagem={erros.ano_início_aprendizado_música}/>
      </div>
      <div className={estilizarDivCampo()}>
        <label className={estilizarLabel(usuárioLogado.cor_tema)}>Data de Nascimento*:</label>
        <InputText name="data_nascimento" type="date" value={dados.data_nascimento} 
          className={estilizarInputText(erros.data_nascimento, usuárioLogado.cor_tema)}
          onChange={alterarEstado}/>
        <MostrarMensagemErro mensagem={erros.data_nascimento}/>
      </div>
      <div className={estilizarDivCampo()}>
        <label className={estilizarLabel(usuárioLogado.cor_tema)}>Telefone*:</label>
        <InputMask name="telefone" autoClear size={TAMANHOS.TELEFONE} onChange={alterarEstado}
          className={estilizarInputMask(erros.telefone, usuárioLogado.cor_tema)} 
          mask={TELEFONE_MÁSCARA} value={dados.telefone}/>
        <MostrarMensagemErro mensagem={erros.telefone}/>
      </div>
      <Divider className={estilizarDivider(dados.cor_tema)}/>
      <div className={estilizarInlineFlex()}>
        <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={redirecionar} />
        <Button className={estilizarBotão()} label={labelBotãoSalvar()} onClick={açãoBotãoSalvar}/>
      </div>
      </Card>
    </div>
  );
};