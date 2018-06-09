const SERVER = 'http://sharp.local.com/'
// const SERVER = 'https://garylv.com/'

const CODE_NEED_LOGIN = 3001

const API_LOGIN = 'api/catering/v1/sessions'

module.exports = {

  checkApi: function (result) {
    if (result.success == false) {
      if (result.code == CODE_NEED_LOGIN) {
        // 重定向
        return false
      } else {
        wx.showToast({
          title: result.message,
          icon: 'loading',
          image: '/images/common/error.png',
          duration: 3000
        })

        setTimeout(function () {
          wx.hideToast();
          wx.navigateBack({
            delta: 1
          })
        }, 3000)

        return false;
      }
    }
    return true;
  },

  login: function (res) {
    const app = getApp()
    const self = this
    //发起网络请求  
    wx.request({
      url: SERVER + API_LOGIN,
      header: app.globalData.headers,
      method: 'POST',
      data: {
        code: res.code
      },
      success: function (res) {
        console.log(res)
        if (self.checkApi(res.data)) {
          var token = res.data.data.token
          var uid = res.data.data.uid
          console.log(token)

          //获取到用户凭证 存儲 3rd_session   
          wx.setStorageSync('token', token)
          wx.setStorageSync('uid', res.data.data.uid)
          app.globalData.token = token
          app.globalData.uid = uid

          return true
        }
        return false
      },
      fail: function (res) {

      }
    })
  },

  userInfoSetInSQL: function (userInfo) {
    wx.request({
      url: 'Our Server ApiUrl',
      data: {
        third_Session: res.data,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        gender: userInfo.gender,
        province: userInfo.province,
        city: userInfo.city,
        country: userInfo.country
      },
      success: function (res) {
        if (逻辑成功) {
          //SQL更新用户数据成功  
        }
        else {
          //SQL更新用户数据失败  
        }
      }
    })
  },
}