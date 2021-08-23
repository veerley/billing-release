"use strict";

import { app, protocol, BrowserWindow, Menu, dialog, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import { autoUpdater } from "electron-updater";
const isDevelopment = process.env.NODE_ENV !== "production";

const fs = require("fs");

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: "#FAFAFA",
    show: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    },
  });

  win.maximize();
  win.show();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    autoUpdater.checkForUpdatesAndNotify();
  }
  setupMenu();
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function setupMenu() {
  const isMac = process.platform === "darwin";

  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideothers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: "File",
      submenu: [
        {
          label: "Open Invoice Directory",
          accelerator: "CommandOrControl+O",
          click() {
            openDirectory();
          },
        },
        isMac ? { role: "close" } : { role: "quit" },
      ],
    },
    // { role: 'editMenu' }
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // { role: 'windowMenu' }
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
    {
      label: "Developer",
      submenu: [
        {
          label: "Toggle Developer Tools",
          accelerator: "CommandOrControl+D",
          click() {
            win.webContents.openDevTools();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function openDirectory() {
  dialog
    .showOpenDialog(win, {
      properties: ["openDirectory"],
    })
    .then((result) => {
      const directory = result.filePaths[0];
      win.webContents.send("selected-directory", directory);
      loadFiles(directory);
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) console.log(err);
    else {
      const filteredFiles = files.filter((file) => file.includes(".csv"));
      const filesInDir = filteredFiles.map((file) => ({
        path: `${directory}/${file}`,
        name: file,
      }));
      win.webContents.send("selected-files", filesInDir);
    }
  });
}

ipcMain.on("save-file-to-csv", (event, data) => {
  dialog
    .showSaveDialog(win, {
      title: "Download to File…",
      filters: [{ name: "All Files", extensions: ["xlsx", "csv"] }],
    })
    .then((result) => {
      fs.writeFile(result.filePath, data, "utf8", function(err) {
        if (err) console.log(err);
        console.log("It's saved!");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("load-files", (event, dir) => {
  loadFiles(dir);
});

ipcMain.on("load-file-data", (event, file) => {
  const fileContent = fs.readFileSync(file).toString();
  event.sender.send("selected-file", fileContent);
});

ipcMain.on("save-file", (event, path, fileData) => {
  fs.writeFile(path, fileData, (err) => {
    if (err) return console.log(err);
    console.log("saved");
  });
});

ipcMain.handle("create-new-file", async (event, directory, name) => {
  const path = `${directory}/${name}.csv`;

  await fs.writeFile(path, "", "utf8", function(err) {
    if (err) console.log(err);
    console.log("created new file!");
    loadFiles(directory);
  });
});

ipcMain.handle("save-visits-to-file", async (event, visits) => {
  await dialog
    .showSaveDialog(win, {
      title: "Save to File…",
      filters: [{ name: "All Files", extensions: ["csv"] }],
    })
    .then((result) => {
      fs.writeFile(result.filePath, visits, "utf8", function(err) {
        if (err) console.log(err);
        console.log("It's saved!");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
