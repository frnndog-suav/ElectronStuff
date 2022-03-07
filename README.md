

# Electron stuff here.
This repository will store important notes and projects developed with Electron technology for frnndog-suav interest.

## Important observations

- [Check electron documentation here](https://www.electronjs.org/docs/latest/api/app)
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
**Don't forget to import your custom css and javascript file inside your html file**
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

## Communication between main and renderer process
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
## Communication inside main process
>_main.js_
>```javascript
>...
>ipcMain.emit("event")
>...
>ipcMain.on("event", () =>{
>...
>});
>```
## Sending parameters from renderer to main process
>_renderer.js_
>```javascript
>const { ipcRenderer } = require("electron");
>...
>ipcRenderer.send("curso-parado", parameter1, parameter2, parameter3,...);
>```
>_main.js_
>```javascript
>ipcMain.on("curso-parado", (event, parameter1, parameter2, parameter3...) => {
>...
>});
>```
>**Obs**: the first parameter is always **event**.
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

## Opening external link on browser (Shell Process)
>_index.html_
>```html
><p>Acesse o youtube <a href="#" id="link-youtube">aqui</a>.</p>
>```
>_index.js_
>```javascript
>const { shell } = require("electron");
>let  linkYoutube = document.querySelector("#link-youtube");
>linkYoutube.addEventListener("click", () => {
>     shell.openExternal("https://www.youtube.com/");
>});
>```

## Get Electron version 
>_index.html_
>```html
><p>Versão do Electron: <span  id="versao-electron"></span></p>
>```
>_index.js_
>```javascript
>const  process = require("process");
>let  versaoElectron = document.querySelector("#versao-electron");
>window.onload = function () {
>    versaoElectron.textContent = process.versions.electron;
>};
>```

## Tray
>**Tray() requires a mandatory argument: your tray icon**
>_main.js_
>```javascript
>const { Tray, Menu } = require("electron");
>...
>let tray = new Tray(__dirname + "/app/img/icon-tray.png");
>let  trayMenu = Menu.buildFromTemplate([
>             { label:  "Cursos"},
>             { label:  "", type:  "separator" },
>             { label:  "Javascript", type:  "radio" },
>             { label:  "Photoshop", type:  "radio" },
>             { label:  "Java", type:  "radio" }
>]);
>tray.setContextMenu(trayMenu);
>```
>**Obs**: Check more tray customization [here](https://www.electronjs.org/pt/docs/latest/api/tray).

## Application menu
>_main.js_
>```javascript
>const { Menu } = require("electron");
>...
>let  templateMenu = [
>   {
>       label:  "Meu menu",
>       submenu: [
>          {
>             label:  "Item 1",
>          },
>          {
>             label:  "Item 2",
>          },
>          ],
>       },
>];
>
>//Application menu treatment for MacOs 
>if (process.platform == "darwin") {
>   templateMenu.unshift({
>      label:  app.getName(),
>      submenu: [
>         {
>            label:  "Mac é complicado",
>         },
>      ],
>   });
>}
>
>let  menuPrincipal = Menu.buildFromTemplate(templateMenu);
>Menu.setApplicationMenu(menuPrincipal);
>```

## Accelerators (shortcuts)
**Accelerators only works when application is on focus**
>_main.js_
>```javascript
>...
>submenu: [
>   {
>      label:  "Example submenu",
>      accelerator:"Shift+I"
>   },
>],
>...
>```
>**Obs**: Check usability [here](https://www.electronjs.org/pt/docs/latest/api/accelerator).

## Globalshortcut
>_main.js_
>```javascript
>const {globalShortcut} = require("electron");
>...
>globalShortcut.register("CmdOrCtrl+Shift+S", () => {...});
>```
>**Obs**: Use accelerator documentation to set shorcut.

## Notification (Web API)
>_renderer.js_
>```javascript
>...
>new  Notification("Alura Timer", {
>   body:  `O curso ${curso.textContent} foi iniciado!`,
>   icon:  "img/play-button.png",
>});
>...
>```

## Packing your application
-	Check the _Electron Packager_ documentation [here](https://github.com/electron/electron-packager).
 - Execute the following command to install _Electron Packager_: `npm install electron-packager -g`.
>**Mind the following file tree sctructure.**
>```
>C:
>├─Electron
>│	├─AluraTimer
>|		├─app
>|		├─...
>|	├─icon
>|		├─icon.png
>|		├─icon.icon
>|		├─icon.icns
>```

 - To pack your application, you must be **one folder above than your project folder** ('Electron' folder) and execute the following command: `electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> --icon=<icon>`
	 - The parameter `--platform` is the operation system you want your application be exported to.
		 - `--platform=darwing` is Mac.
		 - `--platform=win32` is Windows.
		 - `--platform=linux` is Linux
		 - `--platform=linux, darwing, win32` is Linux, Mac and Windows (it doesn't matter the parameters order).
	- The parameter `-arch` is the OS architecture (x32 or x64).
	- You can set your application icon using the parameter `--icon`. Create a new folder in the same place where you project folder is and paste the icon there.
		- Linux -> .png file.
		- Mac -> .icns file.
		- Windows -> .ico file.
		- If you're generating the three OS version all at once, you can set all the icons file with the same name. You don't need to specify the file extension (example:`electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> --icon=icon/icon`)
		
## Commands

- `node -v` -> check NodeJs version.
- `CTRL + C` -> stop app.
