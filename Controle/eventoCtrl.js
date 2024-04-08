import Evnt from "../Modelo/evento.js";

export default class eventoCtrl{

    gravar(requisicao, resposta){

        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const valor = dados.valor;
            const dataEvento = dados.data;

            if(nome && endereco && cidade && estado && valor && dataEvento){
                const evnt = new Evnt(0, nome, endereco, cidade, estado, valor, dataEvento);
                evnt.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status": true,
                        "mensagem": "Evento gravado com sucesso",
                        "codigo_evento" : evnt.codigo
                    })
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possivel armazenar o evento" + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": `Por favor, informe os dados do Evento corretamente. ${nome} , ${endereco} , ${cidade} , ${estado} , ${valor} , ${dataEvento}`
                    
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida"
            })
        }
    }

    atualizar(requisicao, resposta){

        resposta.type('application/json');

        if((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = requisicao.params.codigo;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const valor = dados.valor;
            const dataEvento = dados.data;

            if(codigo && codigo > 0 && nome && endereco && cidade && estado && valor && dataEvento){
                const evnt = new Evnt(codigo, nome, endereco, cidade, estado, valor, dataEvento);
                evnt.atualizar().then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "Evento atualizado com sucesso"
                    })
                }).catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possivel atualizar o evento" + erro.message
                    })
                })
            }
            else {
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe os dados do Evento corretamente."
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida"
            })
        }
    }

    excluir(requisicao, resposta){

        resposta.type('application/json');

        if(requisicao.method === "DELETE"){
            const codigo = requisicao.params.codigo;
            if(codigo && codigo > 0){
                const evnt = new Evnt(codigo);
                evnt.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "Evento excluído com sucesso"
                    })
                }).catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possivel excluir o evento" + erro.message
                    })
                })
            }
            else {
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe os dados do Evento corretamente."
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida"
            })
        }
    }

    consultar(requisicao, resposta){

        resposta.type('application/json');

        if(requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const evnt = new Evnt(0);
            evnt.consultar(termoDePesquisa)
            .then((evnts)=>{
                resposta.status(200);
                resposta.json(evnts);
            })
            .catch((erro)=>{
                resposta.status(500);
                resposta.json({
                    "status": false,
                    "mensagem": "Não foi possivel consultar os eventos" + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida"
            })
        }
    }
}