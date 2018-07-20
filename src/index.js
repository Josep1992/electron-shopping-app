const electron = require('electron');
const path = require('path');
const url = require('url');
const { ipcRenderer } = electron;

const axios = require('axios');

const BrowserWindow = electron.remote.BrowserWindow;

const list = document.querySelector('#output');
const jumbotron = document.querySelector('.jumbotron');
const card = document.querySelector('.card');

const card__title = card.children[0].children[0];
const card__text = card.children[0].children[1];

const addBtn = jumbotron.children[1];
const deleteBtn = jumbotron.children[2];

let addWindow;

addBtn.addEventListener('click', () => {
  addWindow = new BrowserWindow({
    width: 300,
    height: 300,
    //frame: false,
  });
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
  const span = document.createElement('span');
  const i = document.createElement('i');

  span.classList.add('badge', 'badge-danger', 'badge-pill');
  i.classList.add('fas', 'fa-trash-alt');

  span.appendChild(i);

  li.textContent = `💩 ${item}`;
  li.appendChild(span);
  li.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-center',
  );

  list.appendChild(li);
});

//Item Clear
ipcRenderer.on('item:clear', () => {
  list.innerHTML = '';
});

list.addEventListener('click', function(e) {
  if (e.target.classList.contains('fa-trash-alt')) {
    e.target.parentElement.parentElement.remove();
  }
});

async function getQuotes(url) {
  const request = await axios.get(url);
  return request;
}

setInterval(() => {
  getQuotes('https://talaikis.com/api/quotes/random/')
    .then((data) => {
      card__title.innerText = `${data.data.author}`;
      card__text.innerText = `${data.data.quote}`;
      card.classList.remove('invisible');
    })
    .catch((error) => {
      console.log({ error });
      if (error) {
        card.classList.add('invisible');
      }
    });
}, 9000);
