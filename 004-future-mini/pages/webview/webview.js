// pages/webview/webview.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  onMessage(e) {
    const data = e.detail.data[0];
    const routers = getCurrentPages();
    routers[routers.length - 2].updateLocation(data);
  },
});
