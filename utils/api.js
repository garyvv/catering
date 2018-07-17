// const SERVER = 'http://sharp.local.com/'
const SERVER = 'https://garylv.com/'

const CODE_NEED_LOGIN = 3001

const API_LIST = {
  // 登录
  login: {
    method: 'POST',
    urlMaker: options => SERVER + 'api/catering/v1/sessions',
    dataMaker: options => ({
      code: options.code
    }),
    needLogin: false
  },
  // 编辑用户信息
  editCustomer: {
    method: 'PUT',
    urlMaker: options => SERVER + 'api/catering/v1/customers/' + options.uid,
    dataMaker: options => options
  },
  // 用户OSS
  customerOss: {
    method: 'POST',
    urlMaker: options => SERVER + 'api/catering/v1/customers/:uid/oss',
    dataMaker: options => options,
    uploadApi: true,
    headerMaker: options => ({
      'content-type': 'multipart/form-data'
    })
  },
  // 申请商家
  applySeller: {
    method: 'POST',
    urlMaker: options => SERVER + 'api/catering/v1/customers/:uid/sellers',
    dataMaker: options => options,
  },
  // 用户信息
  customerInfo: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/customers/:uid',
    dataMaker: options => options,
  },
  // 商铺信息
  storeInfo: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId',
    dataMaker: options => options,
  },
  // 商铺列表
  storeList: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/sellers/:uid/stores',
    dataMaker: options => options,
  },
  // 商铺分类
  listCategory: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/categories',
    dataMaker: options => options,
  },
  firstCategory: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/categories/' + options.categoryId,
    dataMaker: options => options,
  },
  createCategory: {
    method: 'POST',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/categories',
    dataMaker: options => options,
  },
  updateCategory: {
    method: 'PUT',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/categories/' + options.categoryId,
    dataMaker: options => options,
  },
  deleteCategory: {
    method: 'DELETE',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/categories/' + options.categoryId,
    dataMaker: options => options,
  },

  // 商铺桌子
  listDesk: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/desks',
    dataMaker: options => options,
  },
  firstDesk: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/desks/' + options.deskId,
    dataMaker: options => options,
  },
  createDesk: {
    method: 'POST',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/desks',
    dataMaker: options => options,
  },
  updateDesk: {
    method: 'PUT',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/desks/' + options.deskId,
    dataMaker: options => options,
  },
  deleteDesk: {
    method: 'DELETE',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/desks/' + options.deskId,
    dataMaker: options => options,
  },

  // 商铺商品
  listProduct: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/products',
    dataMaker: options => options,
  },
  firstProduct: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/products/' + options.productId,
    dataMaker: options => options,
  },
  createProduct: {
    method: 'POST',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/products',
    dataMaker: options => options,
  },
  updateProduct: {
    method: 'PUT',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/products/' + options.productId,
    dataMaker: options => options,
  },
  deleteProduct: {
    method: 'DELETE',
    urlMaker: options => SERVER + 'api/catering/v1/stores/:storeId/products/' + options.productId,
    dataMaker: options => options,
  },

  // -------- viewer --------
  // 商铺分类
  viewerCategory: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/viewers/:storeId/categories',
    dataMaker: options => options,
  },
  // 商铺商品
  viewerProduct: {
    method: 'GET',
    urlMaker: options => SERVER + 'api/catering/v1/viewers/:storeId/categories',
    dataMaker: options => options,
  },

  // ------ End -----
}

class API {
  constructor() {
    this.DYNAMIC_CONFIG = null
    this.makeApis()
  }
  makeApis() {
    for (let fnName in API_LIST) {
      let config = API_LIST[fnName]
      this[fnName] = generateNormalApi({
        urlMaker: config.urlMaker,
        dataMaker: config.dataMaker,
        method: config.method,
        headerMaker: config.headerMaker,
        needLogin: config.needLogin,
        uploadApi: config.uploadApi
      })
    }
  }
  
  // 获取动态配置，暂不使用
  // getDynamicConfig() {
  //   return new Promise((resolve, reject) => {
  //     let version = getApiConfig().VERSION
  //     let appid = getApiConfig().APP_ID
  //     if (this.DYNAMIC_CONFIG) {
  //       return resolve(this.DYNAMIC_CONFIG)
  //     } else {
  //       wx.request({
  //         url: getApiConfig().DYNAMIC_CONFIG(),
  //         method: 'GET',
  //         data: {
  //           version,
  //           appid
  //         },
  //         header: getHeader(),
  //         success: res => {
  //           if (res.statusCode === 200) {
  //             this.DYNAMIC_CONFIG = res.data
  //             // this.DYNAMIC_CONFIG = DYNAMIC_CONFIG
  //             resolve(this.DYNAMIC_CONFIG)
  //           } else {
  //             this.DYNAMIC_CONFIG = DYNAMIC_CONFIG
  //             resolve(DYNAMIC_CONFIG)
  //           }
  //         },
  //         fail: res => {
  //           this.DYNAMIC_CONFIG = DYNAMIC_CONFIG
  //           resolve(DYNAMIC_CONFIG)
  //         }
  //       })
  //     }
  //   })
  // }
}

module.exports = new API();

function getHeader(replace = {}) {
  const app = getApp()
  let uid = wx.getStorageSync('uid') ? wx.getStorageSync('uid') : app.globalData.uid
  let token = wx.getStorageSync('token') ? wx.getStorageSync('token') : app.globalData.token
  let header = {
    'content-type': 'application/json', // 默认值
    'mina-source': 'catering',
    'uid': uid,
    'token': token,
    'store-id': app.globalData.storeId,
    'version': app.globalData.version
  }
  if (replace) {
    for (let k in replace) {
      header[k] = replace[k]
    }
  }
  return header
}

function getUid() {
  const app = getApp()
  let uid = wx.getStorageSync('uid') ? wx.getStorageSync('uid') : app.globalData.uid
  return uid
}

function getStoreId() {
  const app = getApp()
  return app.globalData.storeId
}

function generateNormalApi({ urlMaker, dataMaker, method = 'GET', headerMaker, needLogin = true, uploadApi = false }) { // 默认所有API都需要登录
  let NORMAL_API = null
  return NORMAL_API = (options) => {
    const PURE_API = () => {
      return new Promise((resolve, reject) => {
        if (uploadApi) {
          wx.uploadFile({
            url: urlMaker(options).replace(':uid', getUid()).replace(':storeId', getStoreId()),
            filePath: dataMaker && dataMaker(options).file_path,
            name: 'content',
            header: headerMaker ? getHeader(headerMaker(options)) : getHeader(),
            formData: dataMaker && dataMaker(options),
            success: function (res) {
              var result = JSON.parse(res.data)
              if (result.success === true) {
                resolve(result)
              } else {
                if (result.code === CODE_NEED_LOGIN) {
                  console.log('need login ....')
                  // 重定向
                  wx.redirectTo({
                    url: '/pages/common/login',
                  })
                } else {
                  wx.showToast({
                    title: result.msg,
                    icon: 'loading',
                    image: '/images/common/error.png',
                    duration: 3000
                  })
                  reject(result)
                }
              }
              //do something
            }
          })
        } else {
          wx.request({
            url: urlMaker(options).replace(':uid', getUid()).replace(':storeId', getStoreId()),
            method: method,
            data: dataMaker && dataMaker(options),
            header: headerMaker ? headerMaker(options) : getHeader(),
            success: res => {
              let result = res.data
              if (result.success === true) {
                resolve(result)
              } else {
                if (result.code === CODE_NEED_LOGIN) {
                  console.log('need login ....')
                  // 重定向
                  wx.navigateTo({
                    url: '/pages/common/login',
                  })
                } else {
                  wx.showToast({
                    title: result.msg,
                    icon: 'loading',
                    image: '/images/common/error.png',
                    duration: 3000
                  })
                  reject(result)
                }
              }
            },
            fail: res => {
              let result = res.data
              reject(result)
            }
          })
        }
      })
    }
    // if (needLogin) {
      // const LOGIN = require('./utils/login.js').default
      // return LOGIN.checkLoginByWx().then(() => PURE_API())
    // } else {
      return PURE_API()
    // }
  }
}
