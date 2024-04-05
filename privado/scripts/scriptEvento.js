const formularioEvento = document.getElementById('formEvento');
formularioEvento.onsubmit = validarFormulario;

window.onload = buscarEvents;

function validarFormulario(evento = undefined){
    if (formularioEvento.checkValidity()){
        formularioEvento.classList.remove('was-validated');

        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const valor = document.getElementById('valor').value;
        const data = document.getElementById('data').value;
        
        const evnt = {'nome': nome, 'endereco' : endereco, 'cidade': cidade, 'estado': estado, 'valor': valor, 'data': data};
        
        cadastrarEvent(evnt);
    }
    else{
        formularioEvento.classList.add('was-validated');
    }
    evento?.preventDefault();
    evento.stopPropagation();
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
                <td>${evento.data}</td>
                <td>
                    <button onclick = selecionarEvent('${evento.codigo}', '${evento.nome}','${evento.endereco}','${evento.cidade}',
                    '${evento.estado}','${evento.valor}','${evento.data}')>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
                            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z"/>
                        </svg>
                    </button>
                </td>
            `;
            corpo.appendChild('linha');
        }
        tabela.appendChild('corpo');
        espacoTabela.appendChild('tabela');

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