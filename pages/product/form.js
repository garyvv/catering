// pages/store/apply.js
const Api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {
      title: '',
      thumb: '',
      preview_thumb: '',
      price: 0,
      description: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.productId) {
      Api.firstProduct(options)
        .then(res => {
          console.log(res)
          this.setData({
            product: res.data
          })
        })
    }

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

  chooseThumb: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        let postData = {
          file_path: res.tempFilePaths[0],
          folder: 'product'
        }
        Api.customerOss(postData)
          .then((res) => {
            console.log(res)
            let updateData = that.data.product
            updateData.thumb = res.data.object
            updateData.preview_thumb = res.data.url
            that.setData({
              product: updateData
            })
          })
          .catch(function (result) {
            console.error(result)
          })
      }
    })
  },

  bindTitle: function (e) {
    this.data.product.title = e.detail.value
  },
  bindPrice: function (e) {
    this.data.product.price = e.detail.value
  },
  bindDescription: function (e) {
    this.data.product.description = e.detail.value
  },
  changeStatus: function (e) {
    console.log(e)
    let updateData = this.data.product
    updateData.status = e.detail.value === true ? 1 : 0
    this.setData({
      product: updateData
    })
  },

  submit: function () {
    let validate = [
      { field: 'title', name: '名称' },
      { field: 'thumb', name: '菜品图片' },
      { field: 'price', name: '价格' },
    ]
    console.log(this.data.product)
    for (var i = 0; i < validate.length; i++) {
      if (!this.data.product[validate[i].field]) {
        wx.showModal({
          content: validate[i].name + '不能为空',
          showCancel: false,
        })
        return false
      }
    }

    if (this.data.product.id) {
      // edit
      this.data.product.productId = this.data.product.id
      Api.updateProduct(this.data.product)
        .then((res) => {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        })
        .catch(function (result) {
          console.error(result)
        })
    } else {
      Api.createProduct(this.data.product)
        .then((res) => {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        })
        .catch(function (result) {
          console.error(result)
        })
    }

  }

})