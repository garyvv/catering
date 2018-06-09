const Api = require('./api.js')
module.exports = {
  //用户登陆  
  userLogin: function() {
    // const self = this
    this.onLogin()
    // wx.checkSession({
    //   success: function () {
    //     console.log('存在登陆态')
    //     //存在登陆态  
    //     self.getUserInfo()
    //   },
    //   fail: function () {
    //     //不存在登陆态  
    //     console.log('不存在登陆态')
    //     self.onLogin()
    //   }
    // })
  },

  onLogin: function() {
    const self = this
    wx.login({
      success: function (res) {
        if (res.code) {
          if (Api.login(res) === true) {
            console.log('yes')
            self.getUserInfo()
          } else {
            console.log('no!')
          }
        }
      },
      fail: function (res) {

      }
    })

  },

  getUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        Api.userInfoSetInSQL(userInfo)
      },
      fail: function () {
        console.log('获取用户信息失败')
      }
    })
  },

}