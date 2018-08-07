// pages/desk/qrcode.js
const Api = require('../../utils/api.js')
const { $Toast } = require('../../libs/dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deskId: 0,
    qrcode: '',
    tmpFilePath: '',
    deskName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      deskName: options.name
    })
    if (options.deskId <= 0) {
      wx.navigateBack({
        delta: 1,
      })
    }
    this.getQRCode(options.deskId)
  },

  getQRCode: function(deskId) {
    let resData = {
      deskId: deskId
    }

    const self = this
    Api.deskQRCode(resData)
      .then(res => {
        console.log(res)
        // 下载图片
        wx.downloadFile({
          url: res.data.url,
          success: function (downRes) {
            if (downRes.statusCode === 200) {
              self.setData({
                deskId: deskId,
                qrcode: res.data.url,
                tmpFilePath: downRes.tempFilePath
              })
            }
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
  },

  saveQRCodeToTerminal: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.tmpFilePath,
      success(res) {
        console.log(res)
        $Toast({
          content: '已保存到手机相册',
          type: 'success'
        });
      },
      fail(e){
        console.log(e)
        $Toast({
          content: '已取消保存',
          type: 'error'
        });
      }
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