import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoDiretor from "../../contextos/contexto-diretor";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarEstudosInstrumentoDiretor } from "../../serviços/serviços-diretor";
import mostrarToast from "../../utilitários/mostrar-toast";
import { TAMANHOS, estilizarBotão, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard, 
  estilizarColunaConsultar, estilizarColumnHeader, estilizarDataTable, estilizarDataTablePaginator, 
  estilizarDivider, estilizarFilterMenu, estilizarFlex, estilizarTriStateCheckbox }
  from "../../utilitários/estilos";
export default function AdministrarEstudosInstrumento() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { estudoInstrumentoConsultado, setEstudoInstrumentoConsultado } = useContext(ContextoDiretor);
  const [listaEstudosInstrumento, setListaEstudosInstrumento] = useState([]);
  const navegar = useNavigate();
  const opçõesCategoria = [{ label: "Solo", value: "Solo" },
    { label: "Orquestra", value: "Orquestra" },
    { label: "Ensino Próprio", value: "Ensino Próprio" }];
  function retornarPáginaInicial() { navegar("/pagina-inicial"); };
  function adicionarEstudoInstrumento() {
    setEstudoInstrumentoConsultado(null);
    navegar("../cadastrar-estudo-instrumento");
  };
  function ConsultarTemplate(estudo_instrumento) {
    function consultar() {
      setEstudoInstrumentoConsultado(estudo_instrumento);
      navegar("../cadastrar-estudo-instrumento");
    };
    return (
      <Button icon="pi pi-search"
      className={estilizarBotãoTabela(usuárioLogado.cor_tema,
         estudoInstrumentoConsultado?.id === estudo_instrumento.id)}
      tooltip="Consultar Estudo Instrumento" tooltipOptions={{ position: 'top' }} onClick={consultar}/>
    );
  };
  function DropdownÁreaTemplate(opções) {
    function alterarFiltroDropdown(event)
      { return opções.filterCallback(event.value, opções.index); };
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
    async function buscarEstudosInstrumentoDiretor() {
      try {
        const response = await serviçoBuscarEstudosInstrumentoDiretor(usuárioLogado.cpf);
        if (!desmontado && response.data) { setListaEstudosInstrumento(response.data); }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "error");
      }
    };
    buscarEstudosInstrumentoDiretor();
    return () => desmontado = true;
  }, [usuárioLogado.cpf]);
  
  return ( 
    <div className={estilizarFlex()}>
      <Card title="Administrar Estudos Instrumento" className={estilizarCard(usuárioLogado.cor_tema)}>
        <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhum estudo de instrumento encontrado." value={listaEstudosInstrumento} 
          responsiveLayout="scroll" breakpoint="490px" removableSort 
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
          <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
          <Column field="título" header="Título" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
          <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="categoria" header="Categoria" filter filterMatchMode="equals"
            filterElement={DropdownÁreaTemplate} showClearButton={false}
            showFilterOperator={false} showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
          <Column field="desconto" header="Desconto" filter 
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable
            filterMatchMode="equals" filterElement={BooleanFilterTemplate}
            body={BooleanBodyTemplate} showClearButton={false} showAddButton={false}
            filterMenuClassName={estilizarFilterMenu()} dataType="boolean"/>

          <Column field="quantidade_aulas" header="Quantidade de Aulas"
            filter dataType="numeric" filterMatchMode="equals"
            showFilterOperator={false} showAddButton={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />

          <Column field="valor_aula" header="Valor da Aula" filter dataType="numeric"
            filterMatchMode="equals" showFilterOperator={false} showAddButton={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
        </DataTable>
        <Divider className={estilizarDivider()}/>
        <Button className={estilizarBotãoRetornar()} label="Retornar"    
           onClick={retornarPáginaInicial}/>
        <Button className={estilizarBotão()} label="Adicionar" onClick={adicionarEstudoInstrumento}/>
      </Card>
    </div>
  );
}