function listaTarefa() {
    const InputTarefa = document.querySelector('.input-tarefa');
    const botaoAdd = document.querySelector('.btn-add');
    const tarefas = document.querySelector('.lista-tarefas');

    InputTarefa.addEventListener('keypress', function (evento) {
        if (evento.keyCode === 13) {

            if (!InputTarefa.value) return;
            criaTarefa(InputTarefa.value);
        }
    });

    function limpaInput() {
        InputTarefa.value = ''
        InputTarefa.focus();
    }

    function checkBox(li) {
        const check = document.createElement('input');
        check.type = 'checkbox'
        check.classList.add('marcar')
        li.appendChild(check);
    }

    document.addEventListener('click', function (evento) {
        const elemento = evento.target;
        if (elemento.classList.contains('marcar')) {
            elemento.parentElement.remove();
            salvarTarefa();
        }
    });

    function salvarTarefa() {
        const liTarefas = document.querySelectorAll('li');
        const listaDeTarefas = [];
        for (let tarefa of liTarefas) {
            listaDeTarefas.push(tarefa.firstChild.textContent.trim());
        }

        const tarefaJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefaJSON);
    }

    function tarefaSalvas() {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas) || [];

        for (let tarefa of listaDeTarefas) {
            criaTarefa(tarefa);
        }
    }

    tarefaSalvas();

    function criaLi() {
        const li = document.createElement('li');
        return li;
    }

    function criaTarefa(texto) {
        const li = criaLi();
        tarefas.appendChild(li);
        limpaInput();
        li.textContent = texto;
        checkBox(li);
        salvarTarefa();
    }

    botaoAdd.addEventListener('click', function () {
        if (!InputTarefa.value) return;
        criaTarefa(InputTarefa.value);
    });
}
listaTarefa();