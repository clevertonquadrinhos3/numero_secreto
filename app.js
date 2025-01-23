

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo Secreto'

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10' ;

let listaNumerosSorteados =[];
let numeroLimite = 10;
let tentativas = 1;
let numeroSecreto = gerarNumeroSecreto();

function exibirTextoNaTela(campo, texto){
    let titulo = document.querySelector(campo);
    titulo.innerHTML = texto;

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

    //responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value =" ";
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentaivas = `Você Descobriu o número secreto, com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentaivas);
        document.getElementById('reiniciar').removeAttribute('Disabled');
    }else{
        if ( chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
        
    }

}

function gerarNumeroSecreto(){
    let numeroEscolhido = parseInt(Math.random()*numeroLimite + 1);
    let quantidadeDeElementosnaListaSorteados = listaNumerosSorteados.length;

    if (quantidadeDeElementosnaListaSorteados = numeroLimite){
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroSecreto();
    }else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    tentativas = 1;
    mensagemInicial();   
    document.getElementById('reiniciar').setAttribute('Disabled', true);

}

function mensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p',`Escolha um número entre 1 e ${numeroLimite}`);

}

mensagemInicial();


