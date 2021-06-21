/* mudar cor da borda */

const escolherCor = document.getElementById('corDoProjeto') /* seleciona o input color do formulario */
const borda = document.getElementById('editorDeCodigo') /* seleciona o box (area) da div do editor */
escolherCor.addEventListener('input', () => {
  borda.style.borderColor = escolherCor.value
}) /* adiciona evento ao input color, onde ao usuario determinar um valor de cor, a arrow function pegara o valor e aplicara ao atributo borderColor no style do elemento contido na const borda. */

/* aplicando o Highlight js */

const areaDoCodigo = document.querySelector('#aplicativo') /* const recebera o id correspondente a tag do codigo, nesse caso a tag <code>. */
const linguagem = document.querySelector('#linguagem') /* const recebera o id da tag select que contem as options de linguagens. */
const btnEscolhe = document.querySelector('.btn-highlight') /* const recebe input do botao adicionar highlight */

function mudaLinguagem() {
  const codigo = document.querySelector('code') /* const recebe a tag <code> onde sera escrito o codigo */
  areaDoCodigo.innerHTML = `<code class="aplicativo hljs ${linguagem.value}" id="aplicativo" contenteditable="true" aria-label="editor"></code>` /* pegamos a area do codigo e atribuimos a estutura HTML dela o template string que recebera o valor correspondente ao estilo da linguagem */
  areaDoCodigo.innerText = codigo.innerText /* como o evento de mudança de estilo tende a mudar a estrutura completa da tag, dizemos a function que o conteudo escrito antes da function sera o mesmo depois, innerText pega o dado da string e preserva. */
}

/* adicionando evento de mudança de estado ao botao da linguagem */

linguagem.addEventListener('change', () => {
  mudaLinguagem() /* aqui informamos que ao mudar o estado, sera executada a função de cima */
})

/* adicionando gatilho de evento ao clicar no botão */

btnEscolhe.addEventListener('click', () => {
  const codigo = document.querySelector('code') /* criamos a const novamente por ela estar sendo usada no escopo local tanto nessa function quanto na mudaLinguagem() */
  hljs.highlightBlock(codigo) /* aqui aplicamos a function hljs da aplicando o metodo highlightBlock ao elemento contido na const codigo */
})

/* criando function para salvar projetos no localStorage */

const tituloDoProjeto = document.querySelector('#nomeDoProjeto') /* pegamos o input do titulo pelo seu id no html */
const descricaoDoProjeto = document.querySelector('#descricaoDoProjeto') /* pegamos o input da descricao pelo id no html */

/* criando a funcao que capturara e fara o evento de salvar projeto no localStorage */

btnSalvar.addEventListenet('click', () => {
  if (typeOf(localStorage) !== "undefined") {
    console.log('Este navegador suporta o lolocalStorage')
    const projeto = montaProjeto() /* criamos uma const que vai retornar o objeto projeto montado pela function montaProjeto() */
    salvaLocalStorage(projeto) /* por fim, atribuimos o objeto projeto a execucão da funcao de salvar */
  } else {
    console.log('Esse navegador não suporta o localStorage, recomendamos usar o indexedDB')
  }
})

/* criando objeto que vai ser usado para salvar o projeto. OBS.: explicação a função estará abaixo dela*/

function montaProjeto() {
  let projeto = {
    'id': atribuiId(),
    'detalhesDoProjeto': {
      'nomeDoProjeto': tituloDoProjeto.value,
      'descricaoDoProjeto': descricaoDoProjeto.value,
      'linguagem': linguagem.value,
      'codigo': document.querySelector('code'),
      'color': escolherCor.value
    }
  }
  return projeto
}

/* o objeto PROJETO nessa function está recebendo o metodo LET ao invés do CONST porque ela receberá um array, o const não é recomendado quando a operação lógica vai alterar sua propriedade mais de 1 vez. o let permite essa alteração de modo dinamico, portanto dizemos que o valor de uma const é estático enwuanto que no let o valor pode ser dinamico. Na linha 38 atribuimos uma função que conterá o ID que iremos gerar para cada projeto. Veremos essa função com detalhes a seguir. */

/* no formulario no index.html temos o nome do projeto, a descrição, o tipo de linguagem e a cor dele. Para salvarmos todos esses dados temos de classificar eles e os elementos que representam seus valores. para isso determinamos um parametro 'exemplo' e o atributo separado por dois pontos. */

let numeroId = 1 /* o localStorage funciona diferente de uma table de banco de dados, o armazenamento não é sequencial e utiliza o endereço de memória disponivel no instante que for salvo o projeto. logo temos de ditar como ele organizara nossos projetos, e isso começa com essa const */

function atribuiId() {
  return localStorage.length
} /* aqui declaramos que o id correspondera ao valor do tamanho do array. */

function salvaLocalStorage(objetoJson) {
  localStorage.setItem(objetoJson.id, JSON.stringiFy(objetoJson))
} /* nessa function passamos como parametro o objetoJson, isso porque queremos que o objeto do projeto seja encapsulado no formato de string dentro do espaço do localStorage, que somente pode suportar strings em seu array */