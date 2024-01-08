// index.js
// 获取应用实例
import { postArticleList } from "@/apis/article.js";
const app = getApp()
Page({
  data: {
    hasFringe: false,
    list: [],
    // 分页
    page: 1,
    limit: 10,
    hasNext: true,
    cardWidth: 0,
    autoFocus: true,
  },
  onLoad() {
    const {hasFringe} = app.globalData
    this.setData({
      hasFringe,
    })
    this.initData()

    setTimeout(() => {
      this.setData({
        autoFocus: false
      })
    }, 3000);
  },

  async initData() { 
    const {page, limit, hasNext} = this.data
    if (!hasNext) return false
    const res = await postArticleList({
      page,
      limit      
    })
    this.data.page = page + 1
    this.data.hasNext = res.data.hasNext
    this.setData({
      list: [...this.data.list, ...res.data.list]
    })
  },

  onSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  onReachBottom: function() {
    this.initData()
  }
})
