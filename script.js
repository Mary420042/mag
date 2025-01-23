// Carrega os contemplados do Local Storage ou usa uma lista inicial vazia
let contemplados = JSON.parse(localStorage.getItem("contemplados")) || [];

// Função para carregar os contemplados na tabela da página inicial
function carregarContemplados() {
    const tbody = document.getElementById("contemplados");
    if (!tbody) return; // Garante que só funciona no index.html

    tbody.innerHTML = ""; // Limpa a tabela

    contemplados.forEach((item, index) => {
        const row = document.createElement("tr");

        const nomeCell = document.createElement("td");
        nomeCell.textContent = item.nome;

        const celularCell = document.createElement("td");
        celularCell.innerHTML = `
            ${item.celular.slice(0, -2)}** 
            <button onclick="mostrarNumero(${index})" class="reveal-button">Mostrar</button>
        `;

        row.appendChild(nomeCell);
        row.appendChild(celularCell);
        tbody.appendChild(row);
    });
}

// Função para revelar o número completo
function mostrarNumero(index) {
    alert(`Número completo: ${contemplados[index].celular}`);
}

// Adicionar sorteado na página criar.html
function configurarFormulario() {
    const form = document.getElementById("form");
    if (!form) return; // Garante que só funciona no criar.html

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const celular = document.getElementById("celular").value.trim();

        if (!nome || !celular || celular.length !== 11) {
            alert("Por favor, insira um nome e um celular válido (11 dígitos).");
            return;
        }

        // Adiciona o sorteado na lista
        contemplados.push({ nome, celular });

        // Salva no Local Storage
        localStorage.setItem("contemplados", JSON.stringify(contemplados));

        alert("Sorteado adicionado com sucesso!");

        // Redireciona para a página inicial
        window.location.href = "index.html";
    });
}

// Inicializa funções
document.addEventListener("DOMContentLoaded", () => {
    carregarContemplados();
    configurarFormulario();
});
