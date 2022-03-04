const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  globalShortcut,
} = require("electron");
const data = require("./data");
const templateGenerator = require("./template");

const webReference = {
  nodeIntegration: true,
  contextIsolation: false,
};

let sobreWindow = null;
let tray = null;
let mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: webReference,
    width: 600,
    height: 400,
  });

  tray = new Tray(__dirname + "/app/img/icon-tray.png");
  let template = templateGenerator.geraTrayTemplate(mainWindow);
  let trayMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(trayMenu);

  globalShortcut.register("CmdOrCtrl+Shift+S", () => {
    mainWindow.send("atalho-iniciar-parar");
  });

  let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);
  let menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal);

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

ipcMain.on("curso-adicionado", (event, novoCurso) => {
  let novoTemplate = templateGenerator.adicionaCursoNoTray(
    novoCurso,
    mainWindow
  );
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  tray.setContextMenu(novoTrayMenu);
});
