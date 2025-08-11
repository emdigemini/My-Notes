import {todoList} from './notes.js';

const params = new URLSearchParams(window.location.search);
const listId = params.get('id');
const list = todoList.find(item => item.id === listId);
const app = document.querySelector('.app');
const renderNotes = () => {
  app.innerHTML = 
  `
    <header><a class="back" href="index.html">&#10148;</a><h1>${list.title}</h1></header>
    <div class="notepad" contenteditable="true" spellcheck="true" aria-label="Notepad">${list.text}
    </div>
  `;

  const notepad = document.querySelector('.notepad');

  notepad.addEventListener('input', () => {
    list.text = notepad.innerText;
    localStorage.setItem('todoList', JSON.stringify(todoList));
  })

}

if(!list){
  console.log('list not found!');;
}else {
  renderNotes();
}

