const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');
const input = form.children[1];
const btn = form.children[2];

function checkInputValue() {
  if (input.value === '') {
    btn.disable = true;
    return false;
  } else {
    btn.disable = false;
    input.style.border = '2px solid green';
  }
}

checkInputValue();

form.addEventListener('submit', (e) => {
  const item = e.target.elements.add.value;

  ipcRenderer.send('item:add', item);
  e.preventDefault();
});
