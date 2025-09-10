import { app, BrowserWindow, nativeTheme, ipcMain, screen } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;

app.disableHardwareAcceleration();


function createWindow() {
   
   const display = screen.getPrimaryDisplay();
   const dpiApprox = display.scaleFactor * 96;
   const minHeight = Math.round(Math.min((15.5 / 2.54) * dpiApprox, display.workArea.height));
   
   console.log('Heyy:', minHeight);   

    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js"),
        },
        autoHideMenuBar: true,
        fullscreen: false,
        titleBarStyle: 'hidden',
        frame: false,
        show: false,
        minWidth: 800,
        minHeight: minHeight
    });

    

    // Écouter les changements d'état
    win.on('maximize', () => {
        win.webContents.send('window-maximized');
    });

    win.on('unmaximize', () => {
        win.webContents.send('window-unmaximized');
    });

    win.once('ready-to-show', () => {
        win.show();
        win.maximize();
    });

   //  win.loadURL("http://localhost:5173");
   win.loadFile(path.join(__dirname, '../dist/index.html'));


}

app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// IPC Handlers - Version complète
ipcMain.on("window-close", () => {
    if (win && !win.isDestroyed()) win.close();
});

ipcMain.on("window-minimize", () => {
    if (win && !win.isDestroyed()) win.minimize();
});

// Toggle maximize/unmaximize (comportement standard du bouton maximize)
ipcMain.on("window-maximize", () => {
    if (win && !win.isDestroyed()) {
        if (win.isMaximized()) {
            win.unmaximize(); // Restaurer taille normale
        } else {
            win.maximize(); // Maximiser
        }
    }
});

// Action spécifique pour unmaximize (restaurer)
ipcMain.on("window-unmaximize", () => {
    if (win && !win.isDestroyed() && win.isMaximized()) {
        win.unmaximize();
    }
});

// Action pour restaurer (si minimisée)
ipcMain.on("window-restore", () => {
    if (win && !win.isDestroyed()) {
        if (win.isMinimized()) {
            win.restore(); // Restaurer depuis minimized
        } else if (win.isMaximized()) {
            win.unmaximize(); // Restaurer depuis maximized
        }
    }
});

// Retourner l'état maximized
ipcMain.handle("window-is-maximized", () => {
    return win && !win.isDestroyed() ? win.isMaximized() : false;
});
