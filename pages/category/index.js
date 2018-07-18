// pages/category/index.js
const Api = require('../../utils/api.js')
const { $Message } = require('../../libs/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    showModal: false,
    createData: {},
    visible: false,
    actions: [
      {
        name: '编辑',
      },
      {
        name: '查看菜单所以菜品'
      },
      {
        name: '删除',
        color: '#ed3f14'
      }
    ],
    handleCategoryId: 0,
    handleCategoryName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fresh()
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

  fresh: function () {
    Api.listCategory()
      .then(res => {
        this.setData({
          categories: res.data
        })
      })
      .catch(function (e) {
        console.error(e)
      })
  },

  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true,
      handleCategoryId: 0,
      handleCategoryName: ''
    })
  },

  /**
 * 弹出框蒙层截断touchmove事件
 */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    if (this.data.handleCategoryId == 0) {
      console.log(this.data.handleCategoryId)
      Api.createCategory(this.data.createData)
        .then(res => {
          this.fresh()
          this.setData({
            handleCategoryName: '',
            handleCategoryId: 0
          })
          this.hideModal();
        })
        .catch(function (e) {
          console.error(e)
        })
    } else {
      console.log('edit :', this.data.handleCategoryId)
      Api.updateCategory({ categoryId: this.data.handleCategoryId, name: this.data.createData.name })
        .then(res => {
          this.fresh()
          this.setData({
            handleCategoryName: '',
            handleCategoryId: 0
          })
          this.hideModal()
          this.setData({
            visible: false
          })
        })
        .catch(function (e) {
          console.error(e)
        })
    }
    $Message({
      content: '操作成功',
      type: 'success'
    })
  },

  inputChange: function(e) {
    this.setData({
      createData: { name: e.detail.value }
    })
  },

  handleOpen(event) {
    console.log('cid', event.currentTarget.dataset.id)
    this.setData({
      visible: true,
      handleCategoryId: event.currentTarget.dataset.id,
      handleCategoryName: event.currentTarget.dataset.name
    });
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClick ({ detail }) {
    console.log(detail, this.data.handleCategoryId)
    let index = detail.index
    switch(index) {
      case 0://编辑
        this.setData({
          showModal: true
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/product/list?categoryId=' + this.data.handleCategoryId,
        })
        break;
      case 2://删除
        Api.deleteCategory({ categoryId: this.data.handleCategoryId })
          .then(res => {
            console.log(res)
            this.fresh()
            this.setData({
              visible: false,
            })
            $Message({
              content: '删除分类菜单成功',
              type: 'success'
            })
          })
          .catch(function (e) {
            console.error(e)
          })
        
        break;
      default:
        break;
    }


  },

})