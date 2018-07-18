const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  const item = e.target.elements.add.value;
  ipcRenderer.send('item:add', item);
  e.preventDefault();
});
