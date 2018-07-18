// pages/seller/index.js
const app = getApp()
const Api = require('../../utils/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storeInfo: {},
    grids: [{
      image: '../../images/weui/images/icon_tabbar.png',
      name: '菜单分类',
      pages: '/pages/category/index'
    },
    {
      image: '../../images/weui/images/icon_tabbar.png',
      name: '桌子二维码',
      pages: '/pages/desk/list'
    },
    {
      image: '../../images/weui/images/icon_tabbar.png',
      name: '商品管理',
      pages: '/pages/product/list'
    },
    {
      image: '../../images/weui/images/icon_tabbar.png',
      name: '店员管理',
      pages: '/pages/servant/list'
    },
    {
      image: '../../images/weui/images/icon_tabbar.png',
      name: '收银台',
      pages: '/pages/pay/order'
    },
    {
      image: '../../images/weui/images/icon_tabbar.png',
      name: '统计数据',
      pages: '/pages/statistic/index'
    },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let self = this
    Api.storeList()
      .then(res => {
        console.log('store list', res)
        self.setData({
          storeInfo: res.data[0]
        })
        app.setStoreId(res.data[0].id)
      })
      .catch(function (e) {
        console.error(e)
      })
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

  },

})