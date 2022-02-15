const { ipcRenderer, shell } = require("electron");
const process = require("process");

let linkFechar = document.querySelector("#link-fechar");
let linkYoutube = document.querySelector("#link-youtube");
let versaoElectron = document.querySelector("#versao-electron");

window.onload = function () {
  versaoElectron.textContent = process.versions.electron;
};

linkFechar.addEventListener("click", () => {
  ipcRenderer.send("fechar-janela-sobre");
});

linkYoutube.addEventListener("click", () => {
  shell.openExternal("https://www.youtube.com/");
});
