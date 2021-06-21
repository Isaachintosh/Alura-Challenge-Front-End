/* importando objeto salvo no localStorage */

const todosOsProjetos = document.querySelector('.js-todos-projetos') /* const pega tag li da ul referente a area dos projetos no html */

/* criando function para mostrar projeto */

new function() {
  mostraProjetos()
} /* essa function recebe mostraProjetos() para separar a abertura de cada projeto salvo, o metodo NEW serve para duplicarmos um elemento, parametro, variavel e function que recebera mais de uma vez uma determinada operação */

/* crando function que vai criar o template dos projetos */

function mostraProjetos() {
  if (localStorage.length == 0) {
    return
  }
  let projetos = [] /* aqui criamos um array vazio para  alocar os projetos, que terão a estrutura html */
  
  /* condicional para receber os dados do localStorage */
  for (i = 0; i < localStorage.length; i++) {
    projetos.push(JSON.parse(localStorage.getItem(i)))
    /* nesse evento, cada vez que o for executar, essa funcao vai puxar o objetoJSON do array e vai converter de string para objeto pelo metodo parse, getItem é o metodo para coletar o projeto pelo seu id, nesse caso */
  }
  
  /* implementando a montagem dos cards de projeto */
  
  projetos.forEach((projeto) => {
    todosOsProjetos.innerHTML += montaCartao(projeto)
    
    /* aqui dizemos ao sistema que a funcao montaCartao() será adicionada a area dos projetos toda vez que ela for chamada */
    
    const codigoHtml = todosOsProjetos.querySelector(`[data-id="${projeto.id}"]`)
    
    /* criamos entao uma const contendo o seletor correspondente a area que o projeto vai ficar contido e ele herdara o id do projeto */
    
    codigoHtml.querySelector('code').innerText = projeto.detalhesDoProjeto.codigo
    
    /* logo depois especificamos que na tag code no template dentro a const codigoHtml recebera o conteudo do codigo digitado pelo usuario */
    
  })
  
  /* implementando ação de comentar */
  
  /* pegando o botao comentar */
  
  const botoesComentar = document.querySelector('.btn-comentar')
  
  /* vamos agora capturar o evento de click no botao */
  
  botoesComentar.forEach( (botaoComentar, index) => {
    botaoComentar.addEventListener ('click', (e) => {
      criarComentario(e, projetos[index])
    })
  })
} 

  /* Na primeira linha o forEach vai ser aplicado para tratar o submit do botao com o indice do projeto. 
  Na segunda linha capturamos o evento de click e vinculamos a ele outro evento que será executado na terceira linha. 
  Nessa terceira linha especificamos que o evento somente ocorrerá dentro do projeto que tenha o mesmo id, especificado na function criarComentario. */
  
function montaCartao(projeto) {
  /*
  Vamos buscar pelos IDs do projeto e de seus atributos considerando o seguinte:
  
  1. o projeto.id ficara na area maior do elemento que envolve o projeto. Nesse caso a tag <a>
  2. a cor da borda deve ser indicada na <div> que envolve o editor de codigo
  3. a formatacao highlight da linguagem deve aparecer dentro da class da tag <code>
  4. o nome do projeto deve aparecer na tag de titulo do card do projeto
  5. a descricao deve aparecer abaixo do titulo
  6. para aplicar o efeito de colapsar (estender) foi usado a biblioteca do bootstrap, usando no botao com imagem do balao de comentarios os atributos data-toggle="collapse" e data-target="#elemento_${projeto.id"}
  7. o elemento mirado pelo data-target sera a div que recebera a lista dos comentarios dentro da <ul class="lista-de-comentarios" atraves do metodo ${mostrarComentarios(projeto)} 
  */
  let cartao = `
    <li class="container card-projeto">
      <a href="home.html" class="projeto_wrapper" data-id="${projeto.id}">
        <div class="editor-de-codigo" style="border-color: ${projeto.detalhesDoProjeto.color}">
          <div class="janela-do-editor flex-row">
            <img class="janela-botoes" src="assets/img/Ellipse-1.png" alt="" />
            <img class="janela-botoes" src="assets/img/Ellipse-2.png" alt="" />
            <img class="janela-botoes" src="assets/img/Ellipse-3.png" alt="" />
          </div>
          <pre><code class="aplicativo hljs ${projeto.detalhesDoProjeto.linguagem}" id="aplicativo" contenteditable="false" aria-label="editor"></code></pre>
        </div>
      </a>
        <div class="detalhes">
          <div class="propriedades">
            <h3 class="cabecalho-card">${projeto.detalhesDoProjeto.nomeDoProjeto}</h3>
            <p class="cabecalho-card">${projeto.detalhesDoProjeto.descricaoDoProjeto}</p>
            <ul class="interacao">
              <li>
                <button data-toggle="collapse" data-target="#comentarios_${projeto.id}">
                  <img src="assets/img/comentario.png" alt="comentários" />
                </button>
              </li>
              <li><p>9</p></li>
              <li>
                <button>
                  <img src="assets/img/curtir.png" alt="curtidas" />
                </button>
              </li>
              <li><p>9</p></li>
            </ul>
            <div class="autor">
              <img src="assets/img/img-usuario.jpg" class="foto-autor" alt="Logo do Usuário" />
              <p class="nome-autor">Isaac</p>
            </div>
            <div class="container collapse in" id="comentarios_${projeto.id}">
              <ul class="lista-de-comentarios">
                ${mostrarComentarios(projeto)}
              </ul>
              <form>
                <label for="comentario">
                <input type="text" class="form-control" placeholder="comente algo aqui"></input>
                <button class="btn btn-primary" >Comentar</button>
              </form>
            </div>
          </div>
        </div>
    </li>
  `
  return cartao
}

/* criando funcao para mostrar comentarios */

function mostrarComentarios(projeto) {
  
  /* vamos fazer uma condicao e como um adicional, por terem acompanhado até aqui, vamos emitir uma mensagem para os projetos que nao tem comentarios e incentivar nossos usuarios participarem do engajamento */
  
  if (!!projeto.comentarios) {
    const listaComentarios = projeto.comentarios.map((comentario) => {
      return `<li>${comentario}</li>`
    }).toString()
    return listaComentarios
  } else {
    '<span>Não há nenhum comentário! Seja o(a) primeiro(a) :D</span>'
  }
}

/*  criando funcao para criar comentarios */

function criarComentario(evento, projeto) {
  console.log(evento)
  
  /* criando const para receber o input do comentario */
  
  const input = evento.target.parentNode.querySelector('[data-form-input]')
  
  /* a const percorrera o DOM para encontrar o pai do input comentario, indicado por target e onde ocorrera o evento */
  
  /* pegando o elemento da lista pelo atributo path */
  
  const lista = evento.path[2].querySelector('[data-list]')
  
  /* ATENCAO! O evento.path se refere ao atributo ligado ao click do mouse, nao ao elemento html
  para teste, realize um console.log(evento.path, input.path)
  */
  
  const valor = input.value
  
  /* a const valor vai pegar somente o valor do input */
  
  const tarefa = document.createElement('li')
  
  /* const tarefa vai criar uma <li> */
  
  tarefa.classList.add('lista-comentarios')
  
  /* depois de criarmos o elemento, atribuimos o style css pelo metodo classList.add */
  
  const conteudo = `<p class="comentario-postado">${valor}></p>`
  
  /* a const conteudo vai receber a tag <p> contendo o valor do input de comentario */
  tarefa.innerHTML = conteudo
  
  lista.appendChild(tarefa)
  
  /* o metodo appendChild vai adicionar uma <li> a nossa <ul> */
  
  /* calma que ta quase acabando! XD
  Lembram do nosso objeto do projeto, ele tinha um atributo chamado comentarios?
  Então, tinha não, mas por aqui podemos adicionar esse atributo! 
  Vamos acessar o localStorage! */
  
  const projetoAtualLocalStorage = JSON.parse(localStorage[projeto.id])
  if (!projetoAtualLocalStorage.comentarios) {
    projetoAtualLocalStorage.comentarios = []
  }
    
  /* se não houver no objeto o atributo comentarios, passamos o objeto.atributo = [], a [] representa um array, ou seja, esse atributo vai receber uma serie de propriedades ainda não listadas */
    
  /* agora que criamos o atributo vamos associar o valor do input ao atributo no localStorage */
  
  projetoAtualLocalStorage.comentarios.push(valor)
  
  /* vamos pegar o objeto e encapsular de volta para string e enviar para o localStorage */
  
  localStorage.setItem(projetoAtualLocalStorage.id, JSON.stringify(projetoAtualLocalStorage))
  
  
  const noComments = lista.querySelector('span') /* aqui selecionamos a tag span */
  
  noComments && noComents.remove() /* quando o usuario digitar algum comentario, a função removerá a tag span da div comentarios */
  
  valor = "" /* assim que o usuario enviar o comentário, o valor do input será esvaziado */
}