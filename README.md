
# Electron stuff here.
This repository will store important notes and projects developed with Electron technology for frnndog-suav interest.

## Important observations

- [NodeJs](https://nodejs.org/en/) is required
- Create the package.json by executing on your project folder the command `npm init` 
- After you executed the command above, the next command you should run is `npm install electron@latest --save`
- In `package.json` file, choose a proper name for `main` property
>```json
>{      
>   "name": "aluratimer",   
>   "version": "1.0.0",
>   "description": "",
>   **"main": "main.js"**,
>   "scripts": {
>       "test": "echo \"Error: no test specified\" && exit 1"
>   },
>   "author": "",
>   "license": "ISC",
>   "dependencies": {
>       "electron": "^17.0.0"
>   }
>```
- Create a javascript file with the same name you chose above
- In `package.json`, inside `scripts` array, create the following command -> `"start": "electron ."`
- Test the command by writting a simple message like `console.log("Hello World");` in `main.js` file and executing on the root folder of your project the command `npm start`

## Creating window
>
>_main.js_
>```javascript
>const { app, BrowserWindow } = require("electron");
>
>app.on("ready", () => {
>  let mainWindow = new BrowserWindow({
>    width: 600,
>    height: 400,
>  });
>});
>```

## Loading custom HTML file
>**Don't forget to import your custom css and javascript file inside your html file**
>
>_main.js_
>```javascript
>const { app, BrowserWindow } = require("electron");
>
>app.on("ready", () => {
>  let mainWindow = new BrowserWindow({
>    width: 600,
>    height: 400,
>  });
>  mainWindow.loadURL(`file://${__dirname}/your_html_file_location`)
>});
>```

## Communication between Ipc Main and Ipc Renderer
>_index.html_
>```html
><a href="#" id="link-sobre">Sobre</a>
><script src="javascript/renderer.js"></script>
>```
>_renderer.js_
>```javascript
>const { ipcRenderer } = require("electron");
>let linkSobre = document.querySelector("#link-sobre");
>linkSobre.addEventListener("click", () => {
>  ipcRenderer.send("abrir-janela-sobre");
>});
>```
>_main.js_
>```javascript
>ipcMain.on("abrir-janela-sobre", () => {
>   let window = new BrowserWindow({
>       width: 300,
>       height: 200,
>    });
>    window.loadURL(`file://${__dirname}/app/index.html`);
>});
>```

## Preventing multiple instances of the same window from opening
>_main.js_
>```javascript
>let window = null
>ipcMain.on("abrir-janela-sobre", () => {
>   if(window == null){
>       window = new BrowserWindow({
>           width: 300,
>           height: 200,
>       });
>   }
>
>   window.on("closed", () => {
>       window = null;
>   });
>
>    window.loadURL(`file://${__dirname}/app/index.html`);
>});
>```

## Commands

- `node -v` -> check NodeJs version.
- `CTRL + C` -> stop app.


## VS Code shortcuts


  
