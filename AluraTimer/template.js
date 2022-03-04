const data = require("./data");
const { ipcMain } = require("electron");

module.exports = {
  templateInicial: null,

  geraTrayTemplate(window) {
    let template = [{ label: "Cursos" }, { type: "separator" }];

    let cursos = data.pegaNomeDosCursos();

    cursos.forEach((curso) => {
      let menuItem = {
        label: curso,
        type: "radio",
        click: () => {
          window.send("curso-trocado", curso);
        },
      };
      template.push(menuItem);
    });

    this.templateInicial = template;
    return template;
  },
  adicionaCursoNoTray(curso, window) {
    this.templateInicial.push({
      label: curso,
      type: "radio",
      checked: true,
      click: () => {
        window.send("curso-trocado", curso);
      },
    });

    return this.templateInicial;
  },
  geraMenuPrincipalTemplate(app) {
    let templateMenu = [
      {
        label: "Window",
        submenu: [
          {
            role: "minimize",
          },
          {
            role: "close",
          },
        ],
      },
      {
        label: "View",
        submenu: [
          {
            role: "reload",
          },
          {
            role: "toggledevtools",
          },
        ],
      },
      {
        label: "Sobre",
        submenu: [
          {
            label: "Sobre o Alura Timer",
            click: () => {
              ipcMain.emit("abrir-janela-sobre");
            },
            accelerator:"CommandOrControl+I"
          },
        ],
      },
    ];

    if (process.platform == "darwin") {
      templateMenu.unshift({
        label: app.getName(),
        submenu: [
          {
            label: "Estou rodando no mac",
          },
        ],
      });
    }

    return templateMenu;
  },
};
