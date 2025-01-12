const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize'),
  toggleMaximize: () => ipcRenderer.send('toggle-maximize'),
  close: () => ipcRenderer.send('close')
});