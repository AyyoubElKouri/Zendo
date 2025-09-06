// electron/main.js
import { app, BrowserWindow, nativeTheme } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
	nativeTheme.themeSource = "light";
	const win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
		},
		autoHideMenuBar: true,
		fullscreen: true,
	});
	win.webContents;

	// En dev : charge React en mode dev
	// win.loadURL("http://localhost:5173");

	// En Production.

	win.loadFile(path.join(__dirname, "../dist/index.html"));
	win.maximize();

	// win.webContents.openDevTools();
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
