import EventoDAO from "../Persistência/EventoDAO.js";

export default class Evnt {
  #codigo;
  #nome;
  #endereco;
  #cidade;
  #estado;
  #valor;
  #dataEvento;

  constructor(codigo=0, nome="", endereco="", cidade="", estado="", valor=0.00, dataEvento= new Date()){
    this.#codigo = codigo;
    this.nome = nome;
    this.endereco = endereco;
    this.cidade = cidade;
    this.estado = estado;
    this.valor = valor;
    this.#dataEvento = dataEvento;
    }
    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }
    
    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome =  novoNome;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco =  novoEndereco;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get estado(){
        return this.#estado
    }

    set estado(novoEstado){
        this.#estado = novoEstado;
    }

    get valor(){
        return this.#valor;
    }

    set valor(novovalor){
        this .#valor = novovalor;
    }

    get dataEvento(){
        return  this.#dataEvento;
    }

    set dataEvento(novodataEvento) {
        this.#dataEvento = novodataEvento;
    }

    async gravar(){
        const dao = new EventoDAO();
        await dao.gravar(this);
    }

    async atualizar(){
        const dao = new EventoDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new EventoDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new EventoDAO();
        return await dao.consultar(termoDePesquisa);
    }

    toString(){
        return `Evento código: ${this.#codigo} - nome: ${this.#nome}`;
    }

    toJSON(){
        return{
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,        
            "cidade": this.#cidade,
            "estado": this.#estado,
            "valor": this.#valor, 
            "dataEvento": this.#dataEvento


        }
    }
}