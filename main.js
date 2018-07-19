const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let addWindow;

//process.env.NODE_ENV = 'production';

//Main Window
function createWindow() {
  mainWindow = new BrowserWindow({ width: 650, height: 500 });

  //This method load the file relative to the path
  // mainWindow.loadFile('index.html');

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  //Adding the menu to the window
  const menu = Menu.buildFromTemplate(mainMenu);
  //Inserting the menu to the app
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => app.quit());
}

// //Add window
function createAddWindow() {
  addWindow = new BrowserWindow({ width: 300, height: 300, frame: false });

  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './views/addWindow.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  addWindow.on('closed', () => {
    //Remember to always set the window to null because of garbage collection
    addWindow = null;
  });
}

ipcMain.on('item:add', function(e, item) {
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

//Menu Template
const mainMenu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createAddWindow();
        },
      },
      {
        label: 'Clear Item',
        click() {
          mainWindow.webContents.send('item:clear');
        },
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  mainMenu.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  mainMenu.push({
    label: 'Tools',
    submenu: [
      {
        label: 'Toogle DevTools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: 'reload',
      },
    ],
  });
}
