const { app, BrowserWindow, ipcMain } = require("electron");

const webReference = {
  nodeIntegration: true,
  contextIsolation: false,
};

let sobreWindow = null;

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
  if (sobreWindow == null) {
    sobreWindow = new BrowserWindow({
      webPreferences: webReference,
      width: 300,
      height: 200,
    });
  }

  sobreWindow.on("closed", () => {
    sobreWindow = null;
  });

  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});
