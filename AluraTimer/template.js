const data = require("./data");

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
};
