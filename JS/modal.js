const botaoVer = document.getElementsByClassName('botao-ver')

// Convertendo pra array porque sao varios os elementos que tem essa classe 
Array.from(botaoVer).forEach(botao => {
    botao.addEventListener('click', clicou); 
});


function clicou(){
    console.log('clicou');
}