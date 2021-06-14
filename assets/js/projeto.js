/* construindo classe abstrata para receber dados de salvamento do projeto */
export class Projeto {
  constructor (nomeProjeto, descricaoProjeto, linguagemProjeto, corProjeto)
  if (this.constructor == Projeto){
    throw new Error ("Não é recomendável instanciar objeto Projeto diretamente, pois essa é uma classe abstrata.")
  }
  this._nomeProjeto = nomeProjeto
  this._descricaoProjeto = descricaoProjeto
  this._linguagemProjeto = linguagemProjeto
  this._corProjeto = corProjeto
}
set projeto(novoProjeto) {
  if (novoProjeto instanceof Projeto) {
    this._projeto = novoProjeto
  }
}
get projeto(){
  return this._projeto
}
get nome_projeto(){
  return this._nomeProjeto
}
get descricao_projeto(){
  return this._descricaoProjeto
}
get linguagem_projeto(){
  return this._linguagemProjeto
}
get cor_projeto(){
  return this._corProjeto
}