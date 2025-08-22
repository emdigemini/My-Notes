import {todoList} from './notes.js';

const params = new URLSearchParams(window.location.search);
const listId = params.get('id');
const list = todoList.find(item => item.id === listId);
const app = document.querySelector('.app');
const toggle = document.querySelector('.toggle');
const textCount = document.querySelector('.textCounter');

const renderNotes = () => {
  app.innerHTML = 
  `
    <header><a class="back" href="index.html">&#10148;</a><h1>${list.title}</h1></header>
    <div class="notepad" contenteditable="true" spellcheck="true" aria-label="Notepad">
    ${list.text}
    </div>
  `;

  const notepad = document.querySelector('.notepad');
  notepad.addEventListener('keydown', (e) => {
    if(e.key === 'Tab'){
      e.preventDefault()
      document.execCommand('insertText', false, '\t');
    }
  })
  notepad.addEventListener('input', () => {
    list.text = notepad.innerText;
    localStorage.setItem('todoList', JSON.stringify(todoList));

    countCharAndWords();
  })
}

function countCharAndWords(){
  const text = list.text.trim();
  const charCount = text.replace(/\s+/g, '').length;
  const wordCount = text.length > 0 ? text.split(/\s+/).length : 0;
  textCount.innerHTML = `Characters: ${charCount} &bull; Words: ${wordCount}`
}

if(!list){
  console.log('list not found!');
}else {
  renderNotes();
}

/** Toggle Dark Mode */
let darkMode = false;
toggle.addEventListener('click', () => {
  if(!darkMode){
    document.body.classList.add('dark-mode');
    app.classList.remove('slide-inLightMode');
    app.classList.add('slide-inDarkMode');
    darkMode = true;
    toggle.innerHTML = `&#127774; Light Mode`
  }else {
    document.body.classList.remove('dark-mode');
    app.classList.add('slide-inLightMode');
    app.classList.remove('slide-inDarkMode');    
    darkMode = false;
    toggle.innerHTML = `&#127769; Dark Mode`
  }
})

