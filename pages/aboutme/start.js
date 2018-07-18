//login.js
//获取应用实例
var app = getApp();
var base64 = require("../../images/weui/images/base64");
Page({
    data: {
      headline: [{
          id: 1,
          image: base64.icon60,
          url: 'https://garylv.com',
          title: '头条',
          target_type: 'webview',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        },
      ]
    },
    goToIndex: function() {
        wx.switchTab({
            url: '/pages/seller/index',
        });
    },
    onLoad: function() {
        var that = this
        wx.setNavigationBarTitle({
            title: wx.getStorageSync('mallName')
        })
    },
    onShow: function() {

    },
    onReady: function() {
        var that = this;
        setTimeout(function() {
            that.setData({
                remind: ''
            });
        }, 1000);
        wx.onAccelerometerChange(function(res) {
            var angle = -(res.x * 30).toFixed(1);
            if (angle > 14) { angle = 14; } else if (angle < -14) { angle = -14; }
            if (that.data.angle !== angle) {
                that.setData({
                    angle: angle
                });
            }
        });
    }
});