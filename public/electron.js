const electron = require('electron');
const path = require('path');

const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const inProduction = app.isPackaged;

let mainWindow;
let childWindow;
const preload = path.join(
    __dirname, 
    '../',
    'preload.js',
);

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 680, 
        webPreferences: {
            devTools: inProduction ? false : true,
            preload,
        },
    });

    if (inProduction) {
        // index.html?exampleArg=test
        mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    } else {
        // :3000?exampleArg=foobarbaz
        mainWindow.loadURL('http://localhost:3000');
    }

    mainWindow.on('closed', () => (mainWindow = null));
}

// Function to create child window of parent one
function createChildWindow() {
    childWindow = new BrowserWindow({
        width: 400,
        height: 400,
        modal: true,
        show: false,
        parent: mainWindow,
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
        },
    });
    
    childWindow.loadURL(`file://${path.join(
        __dirname, 
        '..',
        "views",
        "childWindow.html"
    )}`);
    
    childWindow.once('ready-to-show', () => {
      childWindow.show();
    });
}

ipcMain.on('openChildWindow', (event, arg) => {
    createChildWindow();
});

ipcMain.on('closeChildWindow', (event, arg) => {
    childWindow.close();
    // win.webContents.send("openChildWindow", responseObj);
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
