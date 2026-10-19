import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário";
export default function RotasDiretor() {
  const { usuárioLogado  } = useContext(UsuárioContext);
  if (usuárioLogado.perfil === "DIRETOR") return <Outlet/>
  else return <Navigate to="/"/>;
}

