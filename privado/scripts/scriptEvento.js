const formularioEvento = document.getElementById('formEvento');
formularioEvento.onsubmit = validarFormulario;

window.onload = buscarEvents;

function validarFormulario(evento = undefined){
    if (formularioEvento.checkValidity()){
        formularioEvento.classList.remove('was-validated');

        const evnt = getEvento();
        cadastrarEvent(evnt);
    }
    else{
        formularioEvento.classList.add('was-validated');
    }
    evento?.preventDefault();
    evento.stopPropagation();
    return false;
}

function getEvento() {
        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const valor = document.getElementById('valor').value;
        const data = document.getElementById('data').value;
        
        return evnt = {'nome': nome, 'endereco' : endereco, 'cidade': cidade, 'estado': estado, 'valor': valor, 'data': data};
        
}

function cadastrarEvent(evnts){
    fetch('http://localhost:3000/eventos',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(evnts)
    })
    .then((resposta)=>{
        return resposta.json();
    })
    .then((dados)=>{
        if (dados.status){
            formularioEvento.reset();
            mostrarMensagem(dados.mensagem, true);
            buscarEvents();
        }
        else{
            mostrarMensagem(dados.mensagem, false);
        }
    })
    .catch((erro)=>{
        mostrarMensagem(erro.message, false);
    });
}

function buscarEvents(){
    fetch('http://localhost:3000/eventos',{method: 'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((dados) => {
        if(Array.isArray(dados)){
            exibirTabelaEvents(dados);
        }
        else{
            mostrarMensagem(dados.mensagem, false);
        }
    })
    .catch((erro)=>{
        mostrarMensagem(erro.mensagem, false);
    })
}

function mostrarMensagem(mensagem, sucesso = false){
    const divMensagem = document.getElementById('mensagem');
    if(sucesso){
        divMensagem.innerHTML = `
        <div class="alert alert-success" role="alert">
        ${mensagem}
        </div>`;
    }
    else{
        divMensagem.innerHTML = `
        <div class="alert alert-danger" role="alert">
        ${mensagem}
        </div>`;
    }
    setTimeout(()=>{
        divMensagem.innerHTML = ''
    }, 5000);
}

function exibirTabelaEvents(listaEvents){
    const espacoTabela = document.getElementById('espacoTabela');
    espacoTabela.innerHTML = '';
    if (listaEvents.length > 0){
        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>ID </th>
                <th>Nome do evento</th>
                <th>Endereço </th>
                <th>Cidade </th>
                <th>Estado </th>
                <th>Valor </th>
                <th>Data </th>
                <th>Ações </th>
            </tr>
        `;
        tabela.appendChild(cabecalho);
        const corpo = document.createElement('tbody');
        for (let i = 0; i < listaEvents.length; i++){
            const evento = listaEvents[i];
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${evento.codigo}</td>
                <td>${evento.nome}</td>
                <td>${evento.endereco}</td>
                <td>${evento.cidade}</td>
                <td>${evento.estado}</td>
                <td>${evento.valor}</td>
                <td>${evento.dataEvento?.substring(0, 10) || 'Sem data'}</td>
                <td>

                    <button type= "button" class = "btn btn-warning" onClick= "prepararTela('${evento.codigo}','${evento.nome}','${evento.endereco}','${evento.cidade}',
                    '${evento.estado}','${evento.valor}','${evento.dataEvento?.substring(0, 10)}', 'atualizacao')" > Editar </button>

                    <button type= "button" class = "btn btn-danger" onClick= "prepararTela('${evento.codigo}','${evento.nome}','${evento.endereco}','${evento.cidade}',
                    '${evento.estado}','${evento.valor}','${evento.dataEvento?.substring(0, 10)}', 'exclusao')" > Excluir</button>

                    
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        espacoTabela.appendChild(tabela);

    }
    else {
        espacoTabela.innerHTML = '<p>Nenhum evento encontrado</p>';
    }
}

function selecionarEvent(codigo, nome, endereco, cidade, estado, valor, data){
    document.getElementById('codigo').value = codigo;
    document.getElementById('nome').value = nome;
    document.getElementById('endereco').value = endereco;
    document.getElementById('cidade').value = cidade;
    document.getElementById('estado').value = estado
    document.getElementById('valor').value = valor;
    document.getElementById('data').value = data;
}

function prepararTela(codigo="", nome="", endereco="", cidade="", estado="", valor="", data="", acao=""){
    
    let botaoCadastrar = document.getElementById('cadastrar');
    let botaoAtualizar = document.getElementById('atualizar');
    let botaoExcluir = document.getElementById('excluir');

    document.getElementById('codigo').value = codigo;
    document.getElementById('nome').value = nome;
    document.getElementById('endereco').value = endereco;
    document.getElementById('cidade').value = cidade;
    document.getElementById('estado').value = estado
    document.getElementById('valor').value = valor;
    document.getElementById('data').value = data;
    

    if (acao === 'exclusao'){   
        document.getElementById('codigo').disabled = true;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = false;
    }

    else if (acao === 'atualizacao'){
        document.getElementById('codigo').disabled = true;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
        botaoExcluir.disabled = true;

    }

    else{
        document.getElementById('codigo').disabled = false;
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = true;
    }
}

function apagarEvents(){
    
    if(confirm("Confirma a exclusão do evento selecionado ")){
        fetch(`http://localhost:3000/eventos/${document.getElementById('codigo').value}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
                },
            
        }).then((resposta)=>{
            return resposta.json();
        })
        .then((dados)=>{
            if (dados.status){
                formularioEvento.reset();
                mostrarMensagem(dados.mensagem, true);
                buscarEvents();
            }
            else{
                mostrarMensagem(dados.mensagem, false);
            }
        })
        .catch((erro)=>{
            mostrarMensagem(erro.message, false);
        });
    }
    else{
        prepararTela();
    }
}

function atualizarEvents(){
    debugger
    const eventoUpdate = getEvento();
    const id = document.getElementById('codigo').value;
    fetch(`http://localhost:3000/eventos/${id}`,{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventoUpdate)
        })
        .then((resposta)=>{
            return resposta.json();
        })
        .then((dados)=>{
        if (dados.status){
            formularioEvento.reset();
            mostrarMensagem(dados.mensagem, true);
            buscarEvents();
        }
        else{
            mostrarMensagem(dados.mensagem, false);
        }
        })
        .catch((erro)=>{
            mostrarMensagem(erro.message, false);
        });
    
}