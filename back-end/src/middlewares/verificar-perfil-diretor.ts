import { Perfil } from "../entidades/usuário";

export default function verificarPerfilDiretor(request, response, next) {
    if (request.perfil === Perfil.DIRETOR) return next();
    else return response.status(401).json({ erro: "Acesso não autorizado." });
};