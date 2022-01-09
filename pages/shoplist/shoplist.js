// pages/shoplist/shoplist.js
Page({

  /**
   * Page initial data
   */
  data: {
    query: {},
    shopList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    isLoading: false
  },

  getShopList(callback) {
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: 'Loading',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res) => {
        console.log(res)
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: Number(res.header["X-Total-Count"])
        })
      },
      complete: () => {
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        // wx.stopPullDownRefresh()
        callback && callback()
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      query: options
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.query.title,
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.getShopList()
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    this.setData({
      shopList: [],
      page: 1,
      total: 0,
    })
    this.getShopList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    if (this.data.isLoading) return

    // if (this.data.shopList.length === this.data.total) return
    if (this.data.page * this.data.pageSize >= this.data.total) {
      return wx.showToast({
        title: "That's it...",
        icon: 'none'
      })
    }

    this.setData({
      page: this.data.page + 1
    })


    this.getShopList()
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})