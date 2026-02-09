import pool from "../config/db.js";

const xmlModel ={
    insert: async (pProduto) => {
        const sql = 'INSERT INTO produtos(nome,preco,quantidade) VALUES (?,?,?);'
        const values = [pProduto.nome, pProduto.preco, pProduto.quantidade];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },
    selectAll: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.execute(sql);
        return rows;
    }

}

export default xmlModel;