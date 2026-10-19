import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário";
export default function RotasMúsico() {
    const { usuárioLogado  } = useContext(UsuárioContext);
    if (usuárioLogado.perfil === "MÚSICO") return <Outlet/>
    else return <Navigate to="/"/>;
}