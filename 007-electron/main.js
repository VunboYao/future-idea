/* 
app: 控制应用程序的事件生命周期
BrowserWindow: 创建并控制浏览器窗口
*/
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 允许渲染进程加载本地资源
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载index.html文件
  win.loadFile('index.html')

  // 打开开发工具
  win.webContents.openDevTools()
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  // macOS中没有开启的窗口时，创建一个窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// (Windows & Linux)，当所有窗口都被关闭的时候退出程序。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
