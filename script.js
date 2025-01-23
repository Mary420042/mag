// Inicializa a lista de contemplados no Local Storage ou usa uma lista vazia
let contemplados = JSON.parse(localStorage.getItem("contemplados")) || [];

// Função para carregar os contemplados no index.html
function carregarContemplados() {
    const tbody = document.getElementById("contemplados");

    if (!tbody) return; // Se a tabela não existir, não faz nada

    tbody.innerHTML = ""; // Limpa a tabela antes de carregar os dados

    if (contemplados.length === 0) {
        tbody.innerHTML = "<tr><td colspan='2'>Nenhum contemplado encontrado.</td></tr>";
        return;
    }

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

// Configura o formulário em criar.html
function configurarFormulario() {
    const form = document.getElementById("form");

    if (!form) return; // Se o formulário não existir, não faz nada

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
    carregarContemplados(); // Carrega contemplados no index.html
    configurarFormulario(); // Configura formulário no criar.html
});
