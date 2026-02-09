import express, { application } from "express";
import router from "./routes/xml.routes.js";
import bodyParser from "body-parser";
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware para aceitar requisições XML
app.use(bodyParser.text({ type: 'application/xml'}));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})