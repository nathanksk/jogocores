// Definição de variáveis
const startButton = document.getElementById("startButton");
const redButton = document.getElementById("redButton");
const greenButton = document.getElementById("greenButton");
const yellowButton = document.getElementById("yellowButton");
const blueButton = document.getElementById("blueButton");
const levelDisplay = document.getElementById("levelDisplay");
const errorMessage = document.getElementById("errorMessage");

// Sons das cores
const redSound = new Audio('red.mp3');
const greenSound = new Audio('green.mp3');
const yellowSound = new Audio('yellow.mp3');
const blueSound = new Audio('blue.mp3');
const errorSound = new Audio('error.mp3');

// Arrays para sequências
let sequence = [];
let userSequence = [];
let level = 0;

// Função para iniciar ou reiniciar o jogo
function iniciarJogo() {
    level = 0;
    sequence = [];
    userSequence = [];
    levelDisplay.textContent = `Nível: ${level}`;
    errorMessage.classList.add("hidden");
    gerarProximaCor();
}

// Função para gerar a próxima cor aleatória e adicionar à sequência
function gerarProximaCor() {
    level++;
    levelDisplay.textContent = `Nível: ${level}`;
    userSequence = [];
    const colors = ['red', 'green', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    mostrarSequencia();
}

// Função para mostrar a sequência de cores ao jogador (com animação)
function mostrarSequencia() {
    let i = 0;
    const interval = setInterval(() => {
        acenderCor(sequence[i]);
        i++;
        if (i === sequence.length) {
            clearInterval(interval);
        }
    }, 800); // Intervalo de 800ms para cada cor
}

// Função para acender uma cor e emitir o som
function acenderCor(cor) {
    const button = document.getElementById(`${cor}Button`);
    const sound = getColorSound(cor);
    
    button.classList.add('highlight');
    sound.play();
    
    setTimeout(() => {
        button.classList.remove('highlight');
    }, 400); // O efeito de "acender" dura 400ms
}

// Função para pegar o som correto com base na cor
function getColorSound(cor) {
    switch(cor) {
        case 'red': return redSound;
        case 'green': return greenSound;
        case 'yellow': return yellowSound;
        case 'blue': return blueSound;
    }
}

// Função para verificar se o clique do jogador está correto
function verificarClique(cor) {
    userSequence.push(cor);
    const sound = getColorSound(cor);
    sound.play();
    
    // Verifica se o clique está correto
    const currentIndex = userSequence.length - 1;
    if (userSequence[currentIndex] !== sequence[currentIndex]) {
        erro();
    } else if (userSequence.length === sequence.length) {
        setTimeout(gerarProximaCor, 1000); // Avança para a próxima rodada
    }
}

// Função para mostrar o erro e reiniciar o jogo
function erro() {
    errorSound.play();
    errorMessage.classList.remove("hidden");
    setTimeout(() => {
        errorMessage.classList.add("hidden");
        iniciarJogo();
    }, 1500);
}

// Event Listeners
redButton.addEventListener('click', () => verificarClique('red'));
greenButton.addEventListener('click', () => verificarClique('green'));
yellowButton.addEventListener('click', () => verificarClique('yellow'));
blueButton.addEventListener('click', () => verificarClique('blue'));

startButton.addEventListener('click', iniciarJogo);
