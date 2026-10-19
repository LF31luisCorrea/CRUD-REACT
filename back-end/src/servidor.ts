import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import RotasUsuário from "./rotas/rotas-usuário";
import RotasDiretor from "./rotas/rotas-diretor";
import RotasMúsico from "./rotas/rotas-músico";
const app = express();
const PORT = process.env.PORT
const CORS_ORIGIN = process.env.CORS_ORIGIN;
    app.use(cors({ origin: CORS_ORIGIN }));
    app.use(express.json());
    app.use("/usuarios", RotasUsuário);
    app.use("/diretores", RotasDiretor);
    app.use("/musicos", RotasMúsico);
    app.listen(PORT || 3333);
    const conexão = createConnection();
export default conexão;