import express from "express";
const router = express.Router();
import xmlController from "../controllers/xml.controller.js";

router.post('/produtos', xmlController.criarProduto);
router.get('/produtos', xmlController.listarTodos);

export default router;