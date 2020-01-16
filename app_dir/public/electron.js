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


/* require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(path.resolve(`${__dirname}`),`../../node_modules/electron`)
}) */

const Store = require("./dep/store.js")

const init_prefs = new Store({
  configName: "user-preferences",
  defaults: {
    windowConfig: { width: 1024, height: 768 }
  }
})

let mainWindow;
console.log("plus")
function createWindow() {
  let { width, height } = init_prefs.get("windowConfig");
  mainWindow = new BrowserWindow({ width: width, height: height, icon: 'favicon.ico' });
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
  mainWindow.on("closed", () => (mainWindow = null))
}

app.on("ready", createWindow)
app.on("resize", () => {
  let { width, height } = mainWindow.getBounds();
  init_prefs
    .set("windowConfig", { width, height })
    .then(() => {})
    .catch(e => console.warn("ON RESIZE ERROR", e))
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
