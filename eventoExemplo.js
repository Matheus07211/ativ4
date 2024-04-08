import Evnt from "./Modelo/evento.js";


const evnts = new Evnts (0,
    "Rock in Rio", "Rua dos Estados, 171",
    "Rio de Janeiro", "Rj", 30.00, new Date());
    (async () => {
        try {
            await evnts.gravar();
            console.log("Evento gravado com sucesso!");
            
    
            evnts.valor = 50.00;
            await evnts.atualizar();
            console.log("Dados do evento atualizados com sucesso!");
    
            await evnts.excluir();
            console.log("O evento foi excluído com sucesso!");

            const evntsQQ = new Evnts();
            const listaevnts = await evntsQQ.consultar("Lola");
            console.log("Eventos encontrados:");
            for (const evnt of listaevnts) {
                console.log(evnts.toJSON());
            }
        } catch (erro) {
            console.log("Erro:", erro);
        }
    })();