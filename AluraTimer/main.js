const { app, BrowserWindow, ipcMain } = require("electron");

const webReference = {
  nodeIntegration: true,
  contextIsolation: false,
};

app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    webPreferences: webReference,
    width: 600,
    height: 400,
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("abrir-janela-sobre", () => {
  let sobreWindow = new BrowserWindow({
    webPreferences: webReference,
    width: 300,
    height: 200,
  });

  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});
