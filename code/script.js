let jogoAtivo = true;
let jogadorAtual = 'X';
let tabuleiro = ['', '', '', '', '', '', '', '', ''];

let qtdVitoriaX = 0;
let qtdVitoriaO = 0;
let qtdEmpate = 0;

$('#imgX').css({opacity: 1.0});
$('#imgO').css({opacity: 0.2});

const padroesVitoria = [
    [0, 1, 2], //primeira linha
    [3, 4, 5], //segunda linha
    [6, 7, 8], //terceira linha
    [0, 3, 6], //primeira coluna
    [1, 4, 7], //segunda coluna
    [2, 5, 8], //terceira coluna
    [0, 4, 8], //diagonal principal
    [2, 4, 6]  //diagonal secundária
];

function verificaVencedor() {
    for (let i = 0; i < padroesVitoria.length; i++) {
        const [a, b, c] = padroesVitoria[i];
        if (tabuleiro[a] && tabuleiro[a] == tabuleiro[b] && tabuleiro[a] == tabuleiro[c]) {
            jogoAtivo = false;
            return tabuleiro[a];
        }
    }
    if (!tabuleiro.includes('')) {
        jogoAtivo = false;
        return 'empate';
    }
    return null;
}

function mostrarStatus() {
    const vencedor = verificaVencedor();
    if (vencedor) {
        if (vencedor == 'empate') {
            qtdEmpate++;
            $('#status').text("Empate!");
            $('#imgX').css({opacity: 1.0});
            $('#imgO').css({opacity: 1.0});
            $('#qtdEmpate').text("Quantidade de Empate: " + qtdEmpate);
        } else {
            $('#status').text(`O Jogador ${vencedor} ganhou!`);
            if (vencedor == 'X'){
                qtdVitoriaX++;
                $('#imgX').css({opacity: 1.0});
                $('#imgO').css({opacity: 0.2});
                $('#qtdVitoriaX').text("Quantidade de Vitória X: " + qtdVitoriaX);
            } else {
                qtdVitoriaO++;
                $('#imgO').css({opacity: 1.0});
                $('#imgX').css({opacity: 0.2});
                $('#qtdVitoriaO').text("Quantidade de Vitória O: " + qtdVitoriaO);
            }
        }
    } else {
        $('#status').text(`É a vez do Jogador ${jogadorAtual}`);
    }
}

function fazerMovimento(index) {
    if (jogoAtivo && tabuleiro[index] == '') {
        tabuleiro[index] = jogadorAtual;
        $('.celula').eq(index).text(jogadorAtual);
        if (jogadorAtual == 'X'){
            $('.celula').eq(index).css('color', '#FD0');
            $('#imgO').css({opacity: 1.0});
            $('#imgX').css({opacity: 0.2});            
        } else {
            $('.celula').eq(index).css('color', '#F44');
            $('#imgX').css({opacity: 1.0});
            $('#imgO').css({opacity: 0.2});
        }
        jogadorAtual = jogadorAtual == 'X' ? 'O' : 'X';
        mostrarStatus();
    }
}

function reiniciarJogo() {
    jogoAtivo = true;
    jogadorAtual = 'X';
    tabuleiro = ['', '', '', '', '', '', '', '', ''];

    $('#imgX').css({opacity: 1.0});
    $('#imgO').css({opacity: 0.2});
    $('.celula').text('');

    mostrarStatus();
}

mostrarStatus();
