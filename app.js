const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL(
        process.env.ELECTRON_START_URL || 'http://localhost:3000' || `file://${path.join(__dirname, 'build', 'index.html')}`
    );

    mainWindow.on('closed', () => (mainWindow = null));

    mainWindow.menuBarVisible = false;

    mainWindow.webContents.openDevTools();
}

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

ipcMain.on('minimize', () => {
    mainWindow.minimize();
});

ipcMain.on('maximize', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});

ipcMain.on('close', () => {
    mainWindow.close();
});