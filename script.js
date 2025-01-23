document.addEventListener('DOMContentLoaded', function() {
    const formSorteado = document.getElementById('formSorteado');
    const listaContemplados = document.getElementById('listaContemplados').getElementsByTagName('tbody')[0];

    formSorteado.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const celular = document.getElementById('celular').value;
        adicionarSorteado(nome, celular);
        formSorteado.reset();
    });

    function adicionarSorteado(nome, celular) {
        const row = listaContemplados.insertRow();
        const cellNome = row.insertCell(0);
        const cellCelular = row.insertCell(1);

        cellNome.textContent = nome;
        cellCelular.textContent = celular.slice(0, -2) + '**';

        row.addEventListener('click', function() {
            cellCelular.textContent = celular;
        });
    }
});
