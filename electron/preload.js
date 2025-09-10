const { contextBridge, ipcRenderer } = require('electron');

const electronAPI = {
    closeWindow: () => ipcRenderer.send("window-close"),
    minimizeWindow: () => ipcRenderer.send("window-minimize"),
    maximizeWindow: () => ipcRenderer.send("window-maximize"),
    unmaximizeWindow: () => ipcRenderer.send("window-unmaximize"), 
    restoreWindow: () => ipcRenderer.send("window-restore"),
    
    isWindowMaximized: () => ipcRenderer.invoke("window-is-maximized"),
    
    onWindowMaximized: (callback) => ipcRenderer.on("window-maximized", callback),
    onWindowUnmaximized: (callback) => ipcRenderer.on("window-unmaximized", callback),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
