import xmlModel from "../models/xml.model.js";
import xml2js from 'xml2js';

const xmlController ={
    criarProduto: async (req, res) => {
        try {
            const xml = req.body;
            xml2js.parseString(xml, async (err, json) => {
                if (err) {
                    return res.status(400).json({message: 'XML inválido'});
                }
                const produto = json.produto;
                const result = await xmlModel.insert({
                    nome: produto.nome[0],
                    preco: produto.preco[0],
                    quantidade: produto.quantidade[0]
                })

                if (result.insertId > 0) {
                    return res.status(201).json({message: 'Registro inserido com sucesso'});
                }
                res.status(400).json({message: 'Ocorreu um erro ao inserir o registro'});
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Ocorreu um erro no servidor', errorMessage: error.message
            });
        }
    },
    listarTodos: async (req, res) => {
        try {
            const result = await xmlModel.selectAll();

            if (result.length > 0) {
                const estruturaXML = new xml2js.Builder({
                    rootName: 'produtos',
                    xmldec: {version: '1.0', encoding: 'UTF-8'}
                });
                const xml = estruturaXML.buildObject({ produto: result});
                res.set('Content-Type', 'application/xml');
                return res.status(200).send(xml);
            }
            
            res.status(200).json({message: 'Não há dados para serem exibidos.'})
        } catch (error) {
             console.error(error);
            res.status(500).json({message:'Ocorreu um erro no servidor', errorMessage: error.message
            });
        }
    }
}

export default xmlController;