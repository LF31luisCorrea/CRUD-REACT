import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarDiretor from "../páginas/diretor/cadastrar-diretor";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarMúsico from "../páginas/músico/cadastrar-músico";
import { ProvedorDiretor } from "../contextos/contexto-diretor";
import { ProvedorMúsico } from "../contextos/contexto-músico";
import RotasDiretor from "./rotas-diretor";
import RotasMúsico from "./rotas-músico";
import AdministrarEstudosInstrumento from "../páginas/diretor/administrar-estudos-instrumento";
import CadastrarEstudoInstrumento from "../páginas/diretor/cadastrar-estudo-instrumento";
import AdministrarOrçamentos from "../páginas/músico/administrar-orçamentos";
import CadastrarOrçamento from "../páginas/músico/cadastrar-orçamento";
import PesquisarEstudosInstrumento from "../páginas/músico/pesquisar-estudos-instrumento";
import ConsultarEstudoInstrumento from "../páginas/músico/consultar-estudo-instrumento";
import PesquisarOrçamentos from "../páginas/diretor/pesquisar-orçamentos";
import ConsultarOrçamento from "../páginas/diretor/consultar-orçamento";
import ConsultarMúsico from "../páginas/diretor/consultar-músico";
import ConsultarDiretor from "../páginas/músico/consultar-diretor";

export default function RotasAplicação() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LogarUsuário />} path="/" />
        <Route element={<CadastrarUsuário />} path="criar-Usuário" />
        <Route element={<RecuperarAcesso />} path="recuperar-acesso" />
        
        <Route element={<RotasUsuárioLogado />}>
          <Route element={<PáginaInicial />} path="pagina-inicial" />
          <Route element={<CadastrarUsuário />} path="atualizar-Usuário" />
          
          <Route element={<ProvedorDiretor><RotasDiretor/></ProvedorDiretor>}>
            <Route element={<CadastrarDiretor/>} path="cadastrar-diretor"/>
            <Route element={<AdministrarEstudosInstrumento/>} path="administrar-estudos-instrumento"/>
            <Route element={<CadastrarEstudoInstrumento/>} path="cadastrar-estudo-instrumento"/>
            <Route element={<PesquisarOrçamentos/>} path="pesquisar-orçamentos"/>
            <Route element={<ConsultarOrçamento/>} path="consultar-orçamento"/>
            <Route element={<ConsultarMúsico/>} path="consultar-músico"/>
          </Route>

          <Route element={<ProvedorMúsico><RotasMúsico/></ProvedorMúsico>}>
            <Route element={<CadastrarMúsico/>} path="cadastrar-músico"/>
            <Route element={<AdministrarOrçamentos/>} path="administrar-orçamentos"/>
            <Route element={<CadastrarOrçamento/>} path="cadastrar-orçamento"/>
            <Route element={<PesquisarEstudosInstrumento/>} path="pesquisar-estudos-instrumento"/>
            <Route element={<ConsultarEstudoInstrumento/>} path="consultar-estudo-instrumento"/>
            <Route element={<ConsultarDiretor/>} path="consultar-diretor"/>

          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}