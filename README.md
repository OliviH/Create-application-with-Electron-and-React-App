# HOW TO CREACTE DESKTOP APPLICATION WITH ELECTRON AND REACT
## HOW TO INSTALL
#### 01/2020

### Create React App

```sh
npx create-react-app  app
cd app
```
***
### Install dependencies
```sh
yarn add electron electron-builder --dev
yarn add wait-on concurrently --dev
yarn add electron-is-dev react-router-dom react-scripts
yarn add @rescripts/cli @rescripts/rescript-env --dev
```
***
### Add files
> `.env`
```
BROWSER=none

```
> `.rescriptsrc.js`
```
module.exports = [require.resolve("./.webpack.config.js")];

```
> `.webpack.config.js`
```
// define child rescript
module.exports = config => {
  config.target = "electron-renderer";
  return config;
};
```
> `public/electron.js`
```javascript
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```
***
### Change file
> `package.json`
```javascript
....
  "private": true,
  "author": {
    "name": "Olivier Heimerdinger",
    "email": "olivier@heimerdinger.me",
    "url": "https://olivier.heimerdinger.me"
  },
  "build": {
    "appId": "com.olivier.heimerdinger.me.MyProductName",
    "productName": "MyProductName",
    "copyright": "Copyright © 2020 ${author}",
    "mac": {
      "category": "public.app-category.utilities"
    },
    "files": [
      "build/**/*",
      "node_modules/**/*"
    ],
    "directories": {
      "buildResources": "assets"
    }
  },
...
  "homepage": "./",
  "main": "public/electron.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron-dev": "concurrently \"yarn start\" \"wait-on http://localhost:3000 && electron .\"",
    "postinstall": "electron-builder install-app-deps",
    "preelectron-pack": "yarn build",
    "electron-pack": "electron-builder build -w"
  },
```
***
### Start development
```
yarn electron-dev
```
***
### Build application
```
yarn electron-pack
```
***
### Example files
You can find an example project on directory
> `./app_dir`
***
## IMPORTANT
To auto reload electron app, install electron-reload
```
yarn add electron-reload
```
and to enable auto reload add this in electron.js `(example)`
> `electron.js`
```
const electron = require("electron")
const path = require("path")
const electronReload = require("electron-reload")
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const isDev = require("electron-is-dev")

if (isDev) {
  electronReload(__dirname,{
    electron: require(path.resolve(`${__dirname}`,`../node_modules/electron`))
  })
}
```
***
#### `Inspiration from`
* [I'm an inline-style link](https://www.google.com)
* [How to build an Electron app using Create React App and Electron Builder](https://www.codementor.io/@randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer)
* [Electron — BROWSER=none npm run start exited with code 1](https://medium.com/@atul15r/electron-browser-none-npm-run-start-exited-with-code-1-b95420c9eeda)
* [electron-cra-boilerplate](https://github.com/rgfindl/electron-cra-boilerplate)
* [Getting Started with Electron, Typescript, React and Webpack](https://www.sitepen.com/blog/getting-started-with-electron-typescript-react-and-webpack/)
* [CRÉER SON APPLICATION MULTIPLATEFORME AVEC ELECTRON](https://www.softfluent.fr/blog/creer-application-multiplateforme-avec-electron/)
