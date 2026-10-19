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
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarOrçamentosMúsico } from "../../serviços/serviços-músico";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,   
  estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator, 
  estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox }
  from "../../utilitários/estilos";
export default function AdministrarOrçamentos() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { orçamentoConsultado, setOrçamentoConsultado, setEstudoInstrumentoSelecionado }
    = useContext(ContextoMúsico);
  const [listaOrçamentos, setListaOrçamentos] = useState([]);
  const navegar = useNavigate();
  const opçõesCategoria = [{ label: "Solo", value: "Solo" },
    { label: "Orquestra", value: "Orquestra" },
    { label: "Ensino Próprio", value: "Ensino Próprio" }];
  function retornarPáginaInicial() { navegar("/pagina-inicial"); };
  function adicionarOrçamento() {
    setOrçamentoConsultado(null);
    setEstudoInstrumentoSelecionado(null);
    navegar("../cadastrar-orçamento");
  };
  function ConsultarTemplate(orçamento) {
    function consultar() {
      setOrçamentoConsultado(orçamento);
      setEstudoInstrumentoSelecionado(null);
      navegar("../cadastrar-orçamento");
    };
    return (
      <Button icon="pi pi-search"
        className={estilizarBotãoTabela(usuárioLogado.cor_tema,
           orçamentoConsultado?.id === orçamento.id)}
        tooltip="Consultar orçamento" tooltipOptions={{ position: 'top' }} onClick={consultar}/>
    );
  };
  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event) { 
      return opções.filterCallback(event.value, opções.index);
    };
    return <Dropdown value={opções.value} options={opçõesCategoria} placeholder="Selecione"
      onChange={alterarFiltroDropdown} showClear />;
  };
  function BooleanBodyTemplate(orçamento) {
    if (orçamento.precisa_desconto) return "Sim";
    else return "Não";
  };
  
  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
    return (
      <div>
        <label>Precisa de desconto:</label>
        <TriStateCheckbox
          className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)} value={opções.value}
          onChange={alterarFiltroTriState}/>
      </div>
    );
  };
  
  useEffect(() => {
    let desmontado = false;
    async function buscarOrçamentosMúsico() {
      try {
        const response = await serviçoBuscarOrçamentosMúsico(usuárioLogado.cpf);
        if (!desmontado && response.data) setListaOrçamentos(response.data);
      } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
    };
    buscarOrçamentosMúsico();
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);
  return ( 
    <div className={estilizarFlex()}>
      <Toast ref={referênciaToast} position="bottom-center"/>
      <Card title="Administrar Orçamentos" className={estilizarCard(usuárioLogado.cor_tema)}>
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhum orçamento encontrado." value={listaOrçamentos} 
          responsiveLayout="scroll" breakpoint="490px" removableSort 
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
  
          <Column field="estudoInstrumento.diretor.usuário.nome" header="Diretor" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="estudoInstrumento.categoria" header="Categoria" filter filterMatchMode="equals"
            filterElement={DropdownÁreaTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable/>
          <Column field="estudoInstrumento.título" header="Título" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column field="precisa_desconto" header="Precisa de Desconto" dataType="boolean" filter 
            showFilterOperator={false} body={BooleanBodyTemplate} 
            filterElement={BooleanFilterTemplate} filterMatchMode="equals" showClearButton={false}
            showAddButton={false} filterMenuClassName={estilizarFilterMenu()}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>          
          <Column field="estudoInstrumento.quantidade_aulas" header="Quantidade de aulas" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>

          <Column field="estudoInstrumento.valor_aula" header="Valor" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
        </DataTable>
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar" 
            onClick={retornarPáginaInicial}/>
        <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarOrçamento}/>
      </Card>
    </div>
  );
}