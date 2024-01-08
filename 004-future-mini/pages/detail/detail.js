// pages/detail/detail.js
import {postArticleDetail} from '@/apis/article'
const { screenWidth } = wx.getSystemInfoSync()
Page({

  /**
   * Page initial data
   */
  data: {
    list: [],
    title: '',
    description: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const {id} = options
    this.fetchData(id)
  },

  async fetchData(id) {
    const res = await postArticleDetail({article_id: id})
    const {list, title, description} = res.data
    this.setData({
      list,
      title,
      swiperHeight: screenWidth / 3 * 4,
      description
    })
  }
})