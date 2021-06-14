const todosOsProjetos = document.querySelector('.js-todos-projetos')

new function() {
  mostraProjetos()
}

function mostraProjetos () {
  if (localStorage.length == 0) {
    return
  }
  let projetos = []
  for (i = 0; i < localStorage.length; i++) {
    projetos.push(
      JSON.parse(
        localStorage.getItem(i)
      )
    )
  }
  projetos.forEach(projeto => {
    todosOsProjetos.innerHTML += montaCartao(projeto)
    const codigoHtml = todosOsProjetos.querySelector(`[data-id="${projeto.id}"]`)
    codigoHtml.querySelector('code').innerText = projeto.detalhesDoProjeto.codigo
  })
  
}

function montaCartao(projeto) {
  /*
  adicionar na interpolação a mudança de cor da borda
  */
  let cartao = `
    <li class="container card-projeto">
      <a href="home.html" class="projeto_wrapper" data-id="${projeto.id}">
        <div class="editor-de-codigo">
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
              <div class="projetos">
                <li>
                  <button data-toggle="collapse" data-target="#comentarios_${projeto.id}">
                    <img src="assets/img/comentario.png" alt="comentários" />
                  </button>
                </li>
                <li><p>0</p></li>
                <li>
                  <button class="curtir-postagem">
                    <img src="assets/img/curtir.png" alt="curtidas" />
                  </button>
                </li>
                <li><p>0</p></li>
              </ul>
              <div class="autor">
                <img src="assets/img/img-usuario.jpg" class="foto-autor" alt="Logo do Usuário" />
                <p class="nome-autor">Isaac</p>
              </div>
            </div>
            <div>
              <div id="comentarios_${projeto.id}" class="collapse in comentarios">
                <ul class="lista-de-comentarios">
                  <li class="lista-de-comentarios">
                    <p class="comentario-salvo comentario-postado"></p>
                  </li>
                </ul>
                
                <label for="formGroupExampleInput" class="form-label"></label>
                
                <input type="text" class="form-control" id="digitarComentario" placeholder="Comente aqui o que achou do projeto">

                <button class="btn btn-primary comentar">
                  Comentar
                </button>
              </div>
            </div>
          </div>
        </div>
    </li>
  `
  return cartao
}

/*
data-id="postar-comentario"
const btnPostarComentario = document.querySelector('.comentar')
const conteudoComentario = document.querySelector('.comentario-postado')
const preencherComentario = document.querySelector('#digitarComentario')

const criarComentarios = (e) => {
  
  e.preventDefault()
  preencherComentario.value
  conteudoComentario.innerText = preencherComentario.value
  
  console.log(conteudoComentario)
  const listarComentarios = document.querySelector('.lista-de-comentarios')
  const conteudo = `<p class="comentario-salvo comentario-postado">${}</p>`

}

btnPostarComentario.addEventListener('click', criarComentarios) */