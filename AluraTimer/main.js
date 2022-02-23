const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const data = require("./data");
const templateGenerator = require("./template");

const webReference = {
  nodeIntegration: true,
  contextIsolation: false,
};

let sobreWindow = null;
let tray = null;

app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    webPreferences: webReference,
    width: 600,
    height: 400,
  });

  tray = new Tray(__dirname + "/app/img/icon-tray.png");
  let template = templateGenerator.geraTrayTemplate();
  let trayMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(trayMenu);

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
      height: 220,
      alwaysOnTop: true,
      frame: false,
    });
  }

  sobreWindow.on("closed", () => {
    sobreWindow = null;
  });

  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on("fechar-janela-sobre", () => {
  sobreWindow.close();
});

ipcMain.on("curso-parado", (event, curso, tempoEstudado) => {
  data.salvaDados(curso, tempoEstudado);
});
