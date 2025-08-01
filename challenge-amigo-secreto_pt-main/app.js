// Array para armazenar os nomes dos amigos
let amigos = [];

// Referências aos elementos do DOM
const inputAmigo = document.getElementById('amigo');
const listaAmigosUl = document.getElementById('listaAmigos');
const resultadoUl = document.getElementById('resultado');
const messageArea = document.getElementById('messageArea');

/**
 * Exibe uma mensagem temporária na área de mensagens.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - O tipo da mensagem ('success' ou 'error').
 */
function showMessage(message, type) {
    messageArea.textContent = message;
    // Remove classes anteriores e adiciona a classe correta
    messageArea.classList.remove('success', 'error');
    messageArea.classList.add(type);

    setTimeout(() => {
        messageArea.textContent = '';
        messageArea.classList.remove(type);
    }, 3000); // Mensagem some após 3 segundos
}

/**
 * Adiciona um novo amigo à lista e atualiza a exibição.
 */
function adicionarAmigo() {
    const nome = inputAmigo.value.trim();

    // Condicional: Verifica se o nome não está vazio
    if (nome === "") {
        showMessage("Por favor, digite um nome válido.", "error");
        return;
    }

    // Condicional: Verifica se o amigo já existe na lista (case-insensitive)
    const amigoJaExiste = amigos.some(amigo => amigo.toLowerCase() === nome.toLowerCase());
    if (amigoJaExiste) {
        showMessage(`"${nome}" já está na lista.`, "error");
        inputAmigo.value = ''; // Limpa o input
        return;
    }

    amigos.push(nome);
    inputAmigo.value = ''; // Limpa o input
    exibirAmigos(); // Atualiza a lista exibida
    showMessage(`"${nome}" adicionado com sucesso!`, "success");
}

/**
 * Exibe a lista de amigos no elemento UL correspondente.
 */
function exibirAmigos() {
    listaAmigosUl.innerHTML = ''; // Limpa a lista atual
    if (amigos.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Nenhum amigo adicionado ainda.";
        li.classList.add('text-gray-500', 'italic'); // Classes para estilo de placeholder
        listaAmigosUl.appendChild(li);
    } else {
        amigos.forEach(amigo => {
            const li = document.createElement('li');
            li.textContent = amigo;
            listaAmigosUl.appendChild(li);
        });
    }
}

/**
 * Embaralha um array usando o algoritmo Fisher-Yates.
 * @param {Array} array - O array a ser embaralhado.
 * @returns {Array} - O array embaralhado.
 */
function embaralharArray(array) {
    // Cria uma cópia do array para não modificar o original diretamente
    const arrayCopia = [...array];
    for (let i = arrayCopia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopia[i], arrayCopia[j]] = [arrayCopia[j], arrayCopia[i]]; // Troca elementos
    }
    return arrayCopia;
}

/**
 * Realiza o sorteio do amigo secreto e exibe os resultados.
 */
function sortearAmigo() {
    resultadoUl.innerHTML = ''; // Limpa resultados anteriores

    // Condicional: Verifica se há amigos suficientes para o sorteio
    if (amigos.length < 2) {
        showMessage("Adicione pelo menos 2 amigos para realizar o sorteio.", "error");
        return;
    }

    // Embaralha a lista de amigos para criar o sorteio
    const amigosEmbaralhados = embaralharArray(amigos);

    // Exibe os pares sorteados
    for (let i = 0; i < amigos.length; i++) {
        const quemDa = amigosEmbaralhados[i];
        // O operador % garante o ciclo (o último amigo dá para o primeiro)
        const quemRecebe = amigosEmbaralhados[(i + 1) % amigos.length]; 

        const li = document.createElement('li');
        li.textContent = `${quemDa} -> ${quemRecebe}`;
        resultadoUl.appendChild(li);
    }
    showMessage("Sorteio realizado com sucesso!", "success");
}

/**
 * Reinicia a aplicação, limpando as listas e o input.
 */
function reiniciar() {
    amigos = []; // Limpa o array de amigos
    inputAmigo.value = ''; // Limpa o input
    exibirAmigos(); // Atualiza a lista de amigos na tela
    resultadoUl.innerHTML = ''; // Limpa os resultados do sorteio
    showMessage("Aplicação reiniciada!", "success");
}

// Inicializa a exibição da lista de amigos quando a página carrega
// O evento DOMContentLoaded garante que o DOM está completamente carregado antes de executar a função.
document.addEventListener('DOMContentLoaded', exibirAmigos);
