import {todoList} from './notes.js';

const overlay = document.querySelector('.overlay');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const inputList = document.getElementById('listNameInput');
const container = document.querySelector('.container');
const content = document.querySelector('.added-list');

document.querySelector('.create-list').addEventListener('click', () => {
  overlay.classList.remove('hidden');
  inputList.focus();
});

cancelBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
})

saveBtn.addEventListener('click', () => {
  if(inputList.value === ''){
    return
  }else{
    createList();
  }
})

inputList.addEventListener('keydown', (k) => {
  if(inputList.value !== '' && k.key === 'Enter'){
    createList();
  }else {
    return;
  }
})

let id = 0;
function generateId() {
  counter++;
  return counter;
}

console.log(generateId()); // note-1
console.log(generateId()); // note-2

function createList(){
  overlay.classList.add('hidden');
  const list = inputList.value;
  todoList.push({
    title: list,
    id: `${list}-${generatedId()}`,
    text: `Click here to start typing your notes...`
  })
  inputList.value = '';
  localStorage.setItem('todoList', JSON.stringify(todoList));
  renderList();
}

renderList();

function renderList(){
  const listRendered = todoList.map(list => 
    `
    <li>
    <a class="open-link" data-list="${list.id}">${list.title}</a>
    <button class="trash-btn" aria-label="Delete list">🗑️</button>
    </li>
    `
  ).join('')

  content.innerHTML = listRendered;

  document.querySelectorAll('.trash-btn').forEach((trashBtn, id) => {
    trashBtn.addEventListener('click', () => {
      todoList.splice(id, 1);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      renderList();
    })
  })

  document.querySelectorAll('.open-link').forEach((openList) => {
    openList.addEventListener('click', () => {
      container.classList.add('slide-out');
      const listId = openList.dataset.list;
      window.location.href = `list.html?id=${encodeURIComponent(listId)}`;
    })
  })


}
