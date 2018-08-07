// pages/viewer/store.js
const Api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: 0,
    deskId: 0,
    chooseCategory: 0,
    categories: [],
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      storeId: options.store_id,
      deskId: options.desk_id,
    })
    this.getStoreCategory(options.store_id, true)
  },

  getStoreCategory: function(storeId, getProduct = false) {
    const self = this
    Api.viewerCategory({storeId: storeId})
      .then(res => {
        console.log(res)
        if (res.data.length <= 0) return false
        self.setData({
          categories: res.data,
          chooseCategory: res.data[0].id
        })
        if (getProduct === true) {
          self.getStoreProducts(storeId, res.data[0].id)
        }
      })
      .catch(e => {
        console.log(e)
      })
  },

  getStoreProducts: function(storeId, categoryId) {
    const self = this
    Api.viewerProduct({ storeId: storeId, category_id: categoryId })
      .then(res => {
        console.log(res)
        if (res.data.length <= 0) return false
        self.setData({
          products: res.data,
        })
      })
      .catch(e => {
        console.log(e)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})