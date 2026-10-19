import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoMúsico from "../../contextos/contexto-músico";
import { serviçoBuscarEstudosInstrumento } from "../../serviços/serviços-músico";
import mostrarToast from "../../utilitários/mostrar-toast";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { TAMANHOS, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard, 
  estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator, 
  estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox, estilizarDivCampo, estilizarLabel, estilizarCheckbox,
  estilizarInputText  }
  from "../../utilitários/estilos";

export default function PesquisarEstudosInstrumento() {
  const [dados, setDados] = useState({
  desconto: false,
  quantidade_aulas: "",
});
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { estudoInstrumentoConsultado, setEstudoInstrumentoConsultado, setEstudoInstrumentoSelecionado }
     = useContext(ContextoMúsico);
  const [listaEstudosInstrumento, setListaEstudosInstrumento] = useState([]);
  const navegar = useNavigate();
  const opçõesCategoria = [{ label: "Solo", value: "Solo" },
    { label: "Orquestra", value: "Orquestra" },
    { label: "Ensino Próprio", value: "Ensino Próprio" }];
  function retornarCadastrarOrçamento() {
    setEstudoInstrumentoSelecionado(estudoInstrumentoConsultado);
    setEstudoInstrumentoConsultado(null);
    navegar("../cadastrar-orçamento");
  };
  function ConsultarTemplate(estudoInstrumento) {
    return (
      <Button icon="pi pi-search"
         className={estilizarBotãoTabela(usuárioLogado.cor_tema,
            estudoInstrumentoConsultado?.id === estudoInstrumento.id)}
         tooltip="Consultar Estudo Instrumento" tooltipOptions={{ position: 'top' }}
         onClick={() => {
            setEstudoInstrumentoConsultado(estudoInstrumento);
            navegar("../consultar-estudo-instrumento");;
         }}/>
    );
  };
  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event) {
       return opções.filterCallback(event.value, opções.index);
    };
    return <Dropdown value={opções.value} options={opçõesCategoria} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  function BooleanBodyTemplate(estudo_instrumento) {
    if (estudo_instrumento.desconto) return "Sim";
    else return "Não";
  };
  
  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
    return (
      <div>
        <label>Desconto:</label>
        <TriStateCheckbox
          className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)} value={opções.value}
          onChange={alterarFiltroTriState}/>
      </div>
    );
  };
  useEffect(() => {
    let desmontado = false;
    async function buscarEstudosInstrumento() {
      try {
        const response = await serviçoBuscarEstudosInstrumento();
        if (!desmontado && response.data) setListaEstudosInstrumento(response.data);
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    };
    buscarEstudosInstrumento();
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);
  return ( 
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center"/>
      <Card title="Pesquisar Estudos Instrumento" className={estilizarCard(usuárioLogado.cor_tema)}>
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhum estudo instrumento encontrado." value={listaEstudosInstrumento} 
          responsiveLayout="scroll" breakpoint="490px" removableSort 
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
          <Column field="diretor.usuário.nome" header="Nome do Diretor" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column field="título" header="Título" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="categoria" header="Categoria" filter filterMatchMode="equals"
            filterElement={DropdownÁreaTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />

          <Column field="desconto" header="Desconto" dataType="boolean" filter 
            showFilterOperator={false}
            body={BooleanBodyTemplate} filterElement={BooleanFilterTemplate} 
            filterMatchMode="equals" showClearButton={false} showAddButton={false} 
            filterMenuClassName={estilizarFilterMenu()}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
         <Column field="quantidade_aulas" header="Quantidade de aulas" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>

          <Column field="valor_aula" header="Valor" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
        </DataTable>
        
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar" 
           onClick={retornarCadastrarOrçamento}/>
      </Card>
    </div>
  );
}