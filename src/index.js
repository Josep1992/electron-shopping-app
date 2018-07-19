const electron = require('electron');
const path = require('path');
const url = require('url');
const { ipcRenderer } = electron;

const BrowserWindow = electron.remote.BrowserWindow;

const list = document.querySelector('#output');
const jumbotron = document.querySelector('.jumbotron');

const addBtn = jumbotron.children[1];
const deleteBtn = jumbotron.children[2];

addBtn.addEventListener('click', () => {
  let addWindow = new BrowserWindow({ width: 300, height: 300 });
  addWindow.on('close', () => (addWindow = null));
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './views/addWindow.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );
  addWindow.show();
});

//Clear list
deleteBtn.addEventListener('click', () => {
  list.innerHTML = '';
});

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
