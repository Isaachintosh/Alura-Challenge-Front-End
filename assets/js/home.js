/* mudar cor da borda */

const escolherCor = document.getElementById('corDoProjeto')
const borda = document.getElementById('editorDeCodigo')

escolherCor.addEventListener('input', () => {
  borda.style.borderColor = escolherCor.value
}) 

/* aplicando highlight */

const areaDoCodigo = document.querySelector('#aplicativo')
const linguagem = document.getElementById('linguagem')
const btnEscolhe = document.querySelector('.btn-highlight')

function mudaLinguagem() {
  const codigo = document.querySelector('code')
  areaDoCodigo.innerHTML = `<code class="aplicativo hljs ${linguagem.value}" id="aplicativo" contenteditable="true" aria-label="editor"></code>`
  areaDoCodigo.innerText = codigo.innerText
}

linguagem.addEventListener('change', () => {
  mudaLinguagem()
})

btnEscolhe.addEventListener('click', () => {
  const codigo = document.querySelector('code')
  hljs.highlightBlock(codigo)
})

/* salvar projeto */

const btnSalvar = document.getElementById('salvarProjeto')
//Agradeço ao apoio do Matheus Henrique da SCUBATEAM na resolução dos bugs e nas explicações

const tituloDoProjeto = document.getElementById('nomeDoProjeto')
const descricaoDoProjeto = document.getElementById('descricaoDoProjeto')

btnSalvar.addEventListener('click', () => {
  if (typeof(localStorage) !== "undefined") {
    console.log('suporta o localstorage')
    const projeto = montaProjeto()
    salvaLocalStorage(projeto)
  } else {
    console.log('não suporta o localstorage')
  }
})

function montaProjeto() {
  /*
  adicionar na matriz a mudança de cor da borda
  */
  let projeto = {
    'id': atribuiId(),
    'detalhesDoProjeto': {
      'nomeDoProjeto': tituloDoProjeto.value,
      'descricaoDoProjeto': descricaoDoProjeto.value,
      'linguagem': linguagem.value,
      'codigo': document.querySelector('code').innerText,
      'color': escolherCor.value,
    }
  }
  return projeto
}

let numeroId = 1

function atribuiId(){
  return localStorage.length
}

function salvaLocalStorage(objetoJson){
  localStorage.setItem(objetoJson.id, JSON.stringify(objetoJson))
}