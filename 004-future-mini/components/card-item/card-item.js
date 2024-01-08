// components/card-item/card-item.js
const app = getApp()

Component({

  /**
   * Component properties
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * Component initial data
   */
  data: {
    cardWidth: 0,
  },

  lifetimes: {
    attached() {
      const { systemInfo } = app.globalData
      this.setData({
        cardWidth: (systemInfo.screenWidth - 12) / 2
      })
    }
  },

  /**
   * Component methods
   */
  methods: {
    onDetail(event) {
      const {item} = event.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/detail/detail?id=${item.id}`,
      })
    }
  }
})