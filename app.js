//app.js
const Common = require('./utils/common.js')
const WeChat = require('./utils/wechat.js')

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
          WeChat.userLogin()
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
        headers: {
          'content-type': 'application/json', // 默认值
          'mina-source': 'catering',
          'uid': null,
          'token': null,
          'store-id': 0
        }
    },

    
    
})