//app.js
const Common = require('./utils/common.js')
const WeChatSDK = require('./utils/wechat_sdk.js')

App({
    onLaunch: function() {
      try {
        this.globalData.token = wx.getStorageSync('token')
        this.globalData.uid = wx.getStorageSync('uid')
        console.log(this.globalData)
        console.log(Common.isNull(this.globalData.token))
        console.log(Common.isNull(this.globalData.uid))
        if (Common.isNull(this.globalData.token) === true || Common.isNull(this.globalData.uid) === true) {
          console.log('未登录')
          WeChatSDK.userLogin()
          .then((result) => {
            console.log(result)
          })
          .catch(function(error) {
            console.log(error)
          })
        }
      } catch (e) {
        console.log(e)
        // Do something when catch error
      }
    },

    globalData: {
        userInfo: null,
        version: "1.0",
        token: null,
        uid: null,
        storeId: 0,
    },

    
    
})