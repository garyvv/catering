const Api = require('../../utils/api.js')
const { $Message } = require('../../libs/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desks: [],
    showModal: false,
    createData: {},
    visible: false,
    actions: [
      {
        name: '编辑',
      },
      {
        name: '保存打印二维码'
      },
      {
        name: '删除',
        color: '#ed3f14'
      }
    ],
    handleDeskId: 0,
    handleDeskName: '',
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
    Api.listDesk()
      .then(res => {
        this.setData({
          desks: res.data
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
      handleDeskId: 0,
      handleDeskName: ''
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
    if (this.data.handleDeskId == 0) {
      console.log(this.data.handleDeskId)
      Api.createDesk(this.data.createData)
        .then(res => {
          this.fresh()
          this.setData({
            handleDeskName: '',
            handleDeskId: 0
          })
          this.hideModal();
        })
        .catch(function (e) {
          console.error(e)
        })
    } else {
      console.log('edit :', this.data.handleDeskId)
      Api.updateDesk({ deskId: this.data.handleDeskId, name: this.data.createData.name })
        .then(res => {
          this.fresh()
          this.setData({
            handleDeskName: '',
            handleDeskId: 0
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

  inputChange: function (e) {
    this.setData({
      createData: { name: e.detail.value }
    })
  },

  handleOpen(event) {
    console.log('cid', event.currentTarget.dataset.id)
    this.setData({
      visible: true,
      handleDeskId: event.currentTarget.dataset.id,
      handleDeskName: event.currentTarget.dataset.name
    });
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClick({ detail }) {
    console.log(detail, this.data.handleDeskId)
    let index = detail.index
    switch (index) {
      case 0://编辑
        this.setData({
          showModal: true
        })
        break;
      case 1:// 生成二维码
        wx.navigateTo({
          url: '/pages/common/qrcode?deskId=' + this.data.handleDeskId,
        })
        break;
      case 2://删除
        Api.deleteDesk({ deskId: this.data.handleDeskId })
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