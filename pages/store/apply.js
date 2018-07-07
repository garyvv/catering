// pages/store/apply.js
const Api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sellerInfo: {
      company: '',
      avatar: '',
      preview_avatar: '',
      tel: '',
      address: '',
      preview_license: '',
      license: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let updateData = this.data.sellerInfo
    updateData.company = options.name
    updateData.preview_avatar = options.avatar + '?x-oss-process=style/preview'
    updateData.avatar = options.avatar
    this.setData({
      sellerInfo: updateData
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

  chooseAvatar: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        let postData = {
          file_path: res.tempFilePaths[0],
          folder: 'apply_seller'
        }
        Api.customerOss(postData)
          .then((res) => {
            console.log(res)
            let updateData = that.data.sellerInfo
            updateData.avatar = res.data.object
            updateData.preview_avatar = res.data.url + '?x-oss-process=style/preview'
            that.setData({
              sellerInfo: updateData
            })
          })
          .catch(function (result) {
            console.error(result)
          })
      }
    })
  },

  chooseLicense: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let postData = {
          file_path: res.tempFilePaths[0],
          folder: 'apply_seller'
        }
        Api.customerOss(postData)
          .then((res) => {
            let updateData = that.data.sellerInfo
            updateData.license = res.data.object
            updateData.preview_license = res.data.url + '?x-oss-process=style/preview'
            that.setData({
              sellerInfo: updateData
            })
          })
          .catch(function (result) {
            console.error(result)
          })
      }
    })
  },

  previewImage: function (e) {
    console.log(this.data)
    wx.previewImage({
      current: this.data.sellerInfo.avatar, // 当前显示图片的http链接
      urls: [this.data.sellerInfo.avatar] // 需要预览的图片http链接列表
    })
  },

  bindCompany: function (e) {
    this.data.sellerInfo.company = e.detail.value
  },
  bindAddress: function (e) {
    this.data.sellerInfo.address = e.detail.value
  },
  bindTel: function (e) {
    this.data.sellerInfo.tel = e.detail.value
  },

  submitApply: function () {
    let validate = [
      { field: 'company', name: '店铺名称' },
      { field: 'avatar', name: '头像' },
      { field: 'tel', name: '店铺电话' },
      { field: 'address', name: '店铺地址' },
      { field: 'license', name: '营业执照' }
    ]
    console.log(this.data.sellerInfo)
    for (var i = 0; i < validate.length; i++) {
      if (!this.data.sellerInfo[validate[i].field]) {
        wx.showModal({
          content: validate[i].name + '不能为空',
          showCancel: false,
        })
        return false
      }
    }
    
    Api.applySeller(this.data.sellerInfo)
      .then((res) => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/common/qrcode?action=apply_seller&action_id=' + res.data.id,
        })
      })
      .catch(function (result) {
        console.error(result)
      })
  }

})