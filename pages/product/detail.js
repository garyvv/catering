// pages/product/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        productId: 0,
        product: {
            title: '商品名称',
            price: '35',
            images: [{
                    'name': '图片一',
                    'image': '/images/weui/images/pic_article.png',
                },
                {
                    'name': '图片一',
                    'image': '/images/weui/images/pic_article.png',
                },
                {
                    'name': '图片一',
                    'image': '/images/weui/images/pic_article.png',
                },
                {
                    'name': '图片一',
                    'image': '/images/weui/images/pic_article.png',
                },
            ]
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.productId) {
            this.setData({
                productId: options.productId
            })
        } else {

        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})