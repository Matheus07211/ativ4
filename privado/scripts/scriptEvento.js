const formularioEvento = document.getElementById('formEvento');
formularioEvento.onsubmit = validarFormulario;

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
        }
        else{
            mostrarMensagem(dados.mensagem, false);
        }
    })
    .catch((erro)=>{
        mostrarMensagem(erro.message, false);
    });
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
}

setTimeout(()=>{
    divMensagem.innerHTML = ''
}, 5000);