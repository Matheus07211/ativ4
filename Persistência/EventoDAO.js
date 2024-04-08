import conectar from "./Conexao.js";
import Evento from "../Modelo/evento.js"
//DAO - data Access Object
export default class EventoDAO {
    async gravar(evento) {
        if (evento instanceof Evento) {
            const conexao = await conectar();
            const sql = `INSERT INTO evento (nome, endereco, cidade, estado, valor, data_evento)
            values (?, ?, ?, ?, ?, ?)`;
            const parametros = [
                evento.nome, 
                evento.endereco,
                evento.cidade,
                evento.estado,
                evento.valor,
                evento.dataEvento
            ];
            const [resultados, campos] = await conexao.execute(sql, parametros);
            evento.codigo = resultados.insertId;
        }
    }
   

    async atualizar(evento) {
        if  (evento instanceof Evento) {
            const conexao = await conectar();
            const sql = `UPDATE evento SET nome = ?, endereco = ?, cidade = ?,   estado = ?, valor = ?, data_evento = ? WHERE id= ?`;
            const parametros = [
                evento.nome, 
                evento.endereco,
                evento.cidade,
                evento.estado,
                evento.valor,
                evento.dataEvento,
                evento.codigo
            ];

            await conexao.execute(sql, parametros);
        }
    }
    
    async excluir(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();   
            const sql = "DELETE FROM evento WHERE id = ?";
            const parametros = [
                evento.codigo
            ]
            await conexao.execute(sql,parametros);
        }
    }

    async consultar(termoDePesquisa){
        if (!termoDePesquisa){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(parseInt(termoDePesquisa))){
            sql = `SELECT * FROM evento WHERE nome LIKE ?`; 
            termoDePesquisa= '%' + termoDePesquisa + '%';            
        }
        else{
            sql=`SELECT * FROM evento WHERE id = ?`;
        }
        const conexao = await conectar(); 
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);

        let listaeventos = [];
        for (const registro of registros){
            const evento = new Evento(
                registro.id,
                registro.nome,
                registro.endereco,
                registro.cidade,
                registro.estado,
                registro.valor,
                registro.data_evento
            );
            listaeventos.push(evento);
        }
        return listaeventos;
    }
}