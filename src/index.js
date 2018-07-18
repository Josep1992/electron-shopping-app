const electron = require('electron');
const { app, ipcRenderer, BrowserWindow } = electron;

const list = document.querySelector('#output');
const jumbotron = document.querySelector('.jumbotron');

const addBtn = jumbotron.children[1];
const deleteBtn = jumbotron.children[2];

//Adding item
ipcRenderer.on('item:add', (e, item) => {
  const li = document.createElement('li');

  li.textContent = item;
  li.classList.add('list-group-item');

  list.appendChild(li);
});

//Item Clear
ipcRenderer.on('item:clear', () => {
  list.innerHTML = '';
});

list.addEventListener('dblclick', function(e) {
  e.target.remove();
});
