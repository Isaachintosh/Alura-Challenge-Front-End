const escolherCor = document.getElementById('corDoProjeto')
const borda = document.getElementById('editorDeCodigo')

escolherCor.addEventListener('input', () => {
  
  borda.style = 'border: 28px solid ' + escolherCor.value + ';'
})

/* aplicando highlight */

const areaDoCodigo = document.querySelector('#editorDeCodigo')
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
  const codigo = areaDoCodigo.querySelector('code')
  hljs.highlightElement(codigo)
})

/* salvar projeto */

const btnSalvar = document.getElementById('salvarProjeto')
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
      'codigo': areaDoCodigo.querySelector('code').innerText
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