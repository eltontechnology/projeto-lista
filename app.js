'use strict';

let  bancoDados = [
    {'tarefa': 'Isabela Martins', 'status': ''},
    {'tarefa': 'Kelly Cardoso', 'status': ''},
    {'tarefa': 'Alessandra...', 'status': ''},
    {'tarefa': 'Michelle...', 'status': ''}
    
];

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (bancoDados) => localStorage.setItem('todoList', JSON.stringify(bancoDados));

function criarItem(tarefa, status, indice){
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice}>`
        document.getElementById('todoList').appendChild(item)
}

function limparTarefas(){
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild)
        todoList.removeChild(todoList.lastChild)
    
}

function atualizarTela(){
    limparTarefas();
    const bancoDados = getBanco();
    bancoDados.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}
function inserirItem(evento){
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter'){
        const bancoDados = getBanco();
        bancoDados.push({'tarefa' : texto, 'status' : ''})
        setBanco(bancoDados);
        atualizarTela();
        evento.target.value = '';
        
    }
}

function removerItem(indice){
    const bancoDados = getBanco();
    bancoDados.splice(indice, 1);
    setBanco(bancoDados)
    atualizarTela();
}

function atualizaItem(indice){
    const bancoDados = getBanco();
    bancoDados[indice].status = bancoDados[indice].status === '' ? 'checked' : '';
    setBanco(bancoDados);
    atualizarTela();
}


function clickItem(evento){
    const elemento = evento.target;
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizaItem(indice)
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);


atualizarTela();
