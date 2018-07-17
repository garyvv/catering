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
            .then((result) => {
              let loginRes = result.data
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
      },
      fail: function () {
        console.log('获取用户信息失败')
      }
    })
  },

}