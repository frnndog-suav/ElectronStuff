const jsonfile = require("jsonfile-promised");
const fs = require("fs");

module.exports = {
  salvaDados(curso, tempoEstudado) {
    let arquivoDoCurso = __dirname + "/data/" + curso + ".json";
    if (fs.existsSync(arquivoDoCurso)) {
      this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
    } else {
      this.criarArquivoDeCurso(arquivoDoCurso, {}).then(() => {
        this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
      });
    }
  },
  adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado) {
    let dados = {
      ultimoEstudo: new Date().toString(),
      tempo: tempoEstudado,
    };

    jsonfile
      .writeFile(arquivoDoCurso, dados, { spaces: 2 })
      .then(() => {
        console.log("Tempo salvo com sucesso");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  criarArquivoDeCurso(nomeArquivo, conteudoDoArquivo) {
    return jsonfile
      .writeFile(nomeArquivo, conteudoDoArquivo)
      .then(() => {
        console.log("Arquivo criado");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  pegaDados(curso) {
    let arquivoDoCurso = __dirname + "/data/" + curso + ".json";
    return jsonfile.readFile(arquivoDoCurso);
  },
  pegaNomeDosCursos() {
    let arquivos = fs.readdirSync(__dirname + "/data/");
    let cursos = arquivos.map((arquivo) => {
      return arquivo.substring(0, arquivo.lastIndexOf("."));
    });
    return cursos;
  },
};
