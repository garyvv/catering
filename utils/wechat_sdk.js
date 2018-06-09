const Api = require('./api.js')

module.exports = {
  userLogin: function() {
    return new Promise((resolve, reject) => {
      const self = this
      wx.login({
        success: function (res) {
          if (res.code) {
            const app = getApp()
            Api.login(res)
            .then((loginRes) => {
              console.log(loginRes)
              console.log('login...')
              //获取到用户凭证 存儲 3rd_session   
              // wx.setStorageSync('token', loginRes.token)
              // wx.setStorageSync('uid', loginRes.uid)
              // wx.setStorageSync('storeId', loginRes.default_store)
              app.globalData.token = loginRes.token
              app.globalData.uid = loginRes.uid
              app.globalData.storeId = loginRes.default_store
              resolve(loginRes)
            })
            .catch(function (result){
              console.error(result)
              reject(result)
            })
          }
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },

  getUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        console.log(userInfo)
        // Api.userInfoSetInSQL(userInfo)
      },
      fail: function () {
        console.log('获取用户信息失败')
      }
    })
  },

}