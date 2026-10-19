import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoCadastrarDiretor, serviçoBuscarDiretor, serviçoAtualizarDiretor } from "../../serviços/serviços-diretor";
import mostrarToast from "../../utilitários/mostrar-toast";
import { MostrarMensagemErro, checarListaVazia, validarCamposObrigatórios } from "../../utilitários/validações";
import {
  estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, estilizarDivider, 
  estilizarDropdown, estilizarFlex, estilizarInlineFlex, estilizarInputNumber, estilizarLabel 
} from "../../utilitários/estilos";
export default function CadastrarDiretor() {

  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
    const [dados, setDados] = useState({ tipo_músico: "", anos_experiência_músico: null });
  const [erros, setErros] = useState({});
  const [cpfExistente, setCpfExistente] = useState(false);
  const navegar = useNavigate();
  const opçõesTipo_músico = [
    { label: "orquestra", value: "orquestra" },
    { label: "solo", value: "solo" }
  ];
  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    const valor = event.target.value;
    setDados({ ...dados, [chave]: valor });
  }
  function validarCampos() {
    let errosCamposObrigatórios;
    errosCamposObrigatórios = validarCamposObrigatórios(dados);
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }
  function títuloFormulário() {
    if (usuárioLogado?.cadastrado) return "Alterar Diretor";
    else return "Cadastrar Diretor";
  }
  async function cadastrarDiretor() {
    if (validarCampos()) {
      try {
        const response = await serviçoCadastrarDiretor({ 
          ...dados, 
          usuário_info: usuárioLogado, 
          tipo_músico: dados.tipo_músico,
          anos_experiência_músico: dados.anos_experiência_músico 
        });
        
        if (response.data) {
          setUsuárioLogado(usuário => ({ 
            ...usuário, 
            status: response.data.status,
            token: response.data.token 
          }));
        }
        mostrarToast(referênciaToast, "Diretor cadastrado com sucesso!", "sucesso");
      } catch (error) {
        setCpfExistente(true);
        const mensagemErro = error.response?.data?.erro || "Erro interno ao cadastrar.";
        mostrarToast(referênciaToast, mensagemErro, "erro");   
      }
    }
  }
  async function atualizarDiretor() {
    if (validarCampos()) {
      try {
        const response = await serviçoAtualizarDiretor({ ...dados, cpf: usuárioLogado.cpf });
        if (response) mostrarToast(referênciaToast, "Diretor atualizado com sucesso!", "sucesso");
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "erro"); }
    }
  };

  function labelBotãoSalvar() {
    if (usuárioLogado?.cadastrado) return "Alterar";
    else return "Cadastrar";
  }
  function açãoBotãoSalvar() {
    if (usuárioLogado?.cadastrado) atualizarDiretor();
    else cadastrarDiretor();
  };
  function redirecionar() {
    if (cpfExistente) {    
      setUsuárioLogado(null);
      navegar("/criar-Usuário");
    } else {
      setUsuárioLogado(usuárioLogado => ({ ...usuárioLogado, cadastrado: true }));
      navegar("/pagina-inicial");
    }
  }
  useEffect(() => {
    let desmontado = false;
    async function buscarDadosDiretor() {
      try {
        const response = await serviçoBuscarDiretor(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setDados(dados => ({ 
            ...dados, 
            tipo_músico: response.data.tipo_músico,
            anos_experiência_músico: response.data.anos_experiência_músico 
          }));
        }
      } catch (error) {
        const erro = error.response?.data?.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    if (usuárioLogado?.cadastrado) buscarDadosDiretor();
    return () => { desmontado = true; };
  }, [usuárioLogado?.cadastrado, usuárioLogado.cpf]); 
  return (
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} onHide={redirecionar} position="bottom-center"/>
      <Card title={títuloFormulário()} className={estilizarCard(usuárioLogado.cor_tema)}>   
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}>Tipo de Músico*:</label>
          <Dropdown name="tipo_músico" className={estilizarDropdown(erros.tipo_músico, usuárioLogado.cor_tema)}value={dados.tipo_músico} 
            options={opçõesTipo_músico} onChange={alterarEstado} placeholder="-- Selecione --"/> 
          <MostrarMensagemErro mensagem={erros.tipo_músico}/>
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuárioLogado.cor_tema)}> Anos de Experiência Musical*:</label>
          <InputNumber name="anos_experiência_músico" size={5} value={dados.anos_experiência_músico} onValueChange={alterarEstado} 
            mode="decimal" inputClassName={estilizarInputNumber(erros.anos_experiência_músico, usuárioLogado.cor_tema)}/>
          <MostrarMensagemErro mensagem={erros.anos_experiência_músico}/>
        </div>
        <Divider className={estilizarDivider(usuárioLogado.cor_tema)}/>        
        <div className={estilizarInlineFlex()}>
          <Button className={estilizarBotãoRetornar()} label="Retornar" onClick={redirecionar} />
          <Button className={estilizarBotão()} label={labelBotãoSalvar()} onClick={açãoBotãoSalvar}/>
        </div>
      </Card>
    </div>
  );
}