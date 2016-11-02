const electron = require('electron')

// Module to control application life.
const {app} = electron;

// Module to create native browser window
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window
// will be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow(){
  console.log('creating window');
  // Create the browser window
  win = new BrowserWindow({
    width: 800,
    height: 300,
    frame: false,
    resizable: false
  });

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/app/index.html`);

  // Open the DevTools
  // win.webContents.openDevTools();

  // Emitted when the window is closed
  win.on('closed', () =>{
    console.log('window closed');
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  // When UI has finish loading
  win.webContents.on('did-finish-load', () => {
    // Send the timer value
    win.webContents.send('timer-change', timerTime);
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow); // <- 2nd parameter is a function not an invokation

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log('all windows closed');
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin'){
    app.quit();
  }
});

app.on('activate', () => {
  console.log('activation of app');
  // On OS X its  common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null){
    createWindow();
  }
});

let argsCmd = process.argv.slice(2);
let timerTime = parseInt(argsCmd[0]);
console.log('passed ' + timerTime);
