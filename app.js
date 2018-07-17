//app.js
const Common = require('./utils/common.js')
const WeChatSDK = require('./utils/wechat_sdk.js')
const Api = require('./utils/api.js')

App({
    onLaunch: function() {

    },

    globalData: {
        userInfo: null,
        version: "1.0",
        token: null,
        uid: null,
        storeId: 0,
    },

    setStoreId: function (storeId) {
      this.globalData.storeId = storeId
    },

    checkLogin: function() {
      return new Promise((resolve, reject) => {
        this.globalData.token = wx.getStorageSync('token')
        this.globalData.uid = wx.getStorageSync('uid')
        console.log('check login global：', this.globalData)
        if (Common.isNull(this.globalData.token) === true || Common.isNull(this.globalData.uid) === true) {
          console.log('未登录')
          reject(false)
        } else {
          resolve(true)
        }
      })
    },

    login: function (userInfo) {
      WeChatSDK.userLogin()
        .then((result) => {
          console.log('登录result', result)
          //获取到用户凭证 存儲 3rd_session   
          wx.setStorageSync('token', result.token)
          wx.setStorageSync('uid', result.uid)
          wx.setStorageSync('storeId', result.default_store)
          this.globalData.token = result.token
          this.globalData.uid = result.uid
          this.globalData.storeId = result.default_store
          this.globalData.userInfo = userInfo
          console.log('登录后globalData', this.globalData)
          userInfo.uid = result.uid
          Api.editCustomer(userInfo)
          .then((res) => {
            console.log('编辑用户信息res：', res)
          })
          .catch(function (result) {
            console.error(result)
          })

          wx.navigateBack({
            delta: 1
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    
})