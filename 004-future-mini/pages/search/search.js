// pages/search/search.js
import { postArticleList } from "@/apis/article.js";
Page({

  /**
   * Page initial data
   */
  data: {
    // 分页
    page: 1,
    limit: 10,
    hasNext: true,
    list: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
  },

  // 搜索
  async onSearch(event) {
    const search = event.detail.value
    const {page, limit, hasNext} = this.data
    if (!hasNext) return false
    const res = await postArticleList({
      title: search,
      page,
      limit      
    })
    this.data.page = page + 1
    this.data.hasNext = res.data.hasNext
    this.setData({
      list: [...this.data.list, ...res.data.list]
    })
  },

  onClear() {
    this.setData({
      list: [],
      page: 1,
      limit: 10,
      hasNext: true,
    })
  },
  /**
   * Called when page reach bottom
   */
  onReachBottom() {
    this.onSearch()
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})