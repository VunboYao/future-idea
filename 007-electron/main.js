/* 
app: 控制应用程序的事件生命周期
BrowserWindow: 创建并控制浏览器窗口
*/
const { app, BrowserWindow } = require('electron')
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

app.whenReady().then(() => {
  createWindow()

  // macOS中点击dock图标时没有已打开的窗口时，创建一个窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
