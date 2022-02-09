
# Electron stuff here.
This repository will store important notes and projects developed with Electron technology for frnndog-suav interest.

## Important observations

- [NodeJs](https://nodejs.org/en/) is required
- Create the package.json by executing on your project folder the command `npm init` 
- After you executed the command above, the next command you should run is `npm install electron@latest --save`
- In `package.json` file, choose a proper name for `main` property
>{      
>   "name": "aluratimer",   
>   "version": "1.0.0",
>"description": "",
>**"main": "main.js"**,
>"scripts": {
>"test": "echo \"Error: no test specified\" && exit 1"
>},
>"author": "",
>"license": "ISC",
>"dependencies": {
>"electron": "^17.0.0"
>     }
>}
- Create a javascript file with the same name you chose above
- In `package.json`, inside `scripts` array, create the following command -> `"start": "electron ."`
- Test the command by writting a simple message like `console.log("Hello World");` in `main.js` file and executing on the root folder of your project the command `npm start`

## Commands

- `node -v` -> check NodeJs version.
- `CTRL + C` -> stop app.


## VS Code shortcuts

