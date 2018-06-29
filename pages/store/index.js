// pages/seller/index.js
const app = getApp()
const Api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: 0,
    grids: [{
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
      pages: ''
    },
    {
      image: '../../images/weui/images/icon_tabbar.png',
      name: '统计数据',
      pages: ''
    },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      storeId: app.globalData.storeId
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

  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
    e.detail.userInfo.uid = app.globalData.uid
    Api.editCustomer(e.detail.userInfo)
      .then((res) => {
        console.log(res)
        // 跳转填写页面
        wx.navigateTo({
          url: '/pages/store/apply?name=' + e.detail.userInfo.nickName + '&avatar=' + e.detail.userInfo.avatarUrl,
        })
      })
      .catch(function (result) {
        console.error(result)
      })
  },
})