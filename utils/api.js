const SERVER = 'http://sharp.local.com/'
// const SERVER = 'https://garylv.com/'

const CODE_NEED_LOGIN = 3001

const API_LIST = {
  login: {
    method: 'POST',
    urlMaker: options => SERVER + 'api/catering/v1/sessions',
    dataMaker: options => ({
      code: options.code
    }),
    needLogin: false
  },
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
        needLogin: config.needLogin
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
  let header = {
    'content-type': 'application/json', // 默认值
    'mina-source': 'catering',
    'uid': app.globalData.uid,
    'token': app.globalData.token,
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
function generateNormalApi({ urlMaker, dataMaker, method = 'GET', headerMaker, needLogin = true }) { // 默认所有API都需要登录
  let NORMAL_API = null
  return NORMAL_API = (options) => {
    const PURE_API = () => {
      return new Promise((resolve, reject) => {
        wx.request({
          url: urlMaker(options),
          method: method,
          data: dataMaker && dataMaker(options),
          header: headerMaker ? headerMaker(options) : getHeader(),
          success: res => {
            let result = res.data
            if (result.success === true) {
              resolve(result.data)
            } else {
              if (result.code === CODE_NEED_LOGIN) {
                // 重定向

                // maka
                // const LOGIN = require('./utils/login.js').default
                // LOGIN.forceLoginByWx().then(() => NORMAL_API(options)).then(resolve).catch(reject)
              } else {
                wx.showToast({
                  title: result.message,
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

// module.exports = {

//   login: function (res) {
//     const app = getApp()
//     const self = this
//     return new Promise((resolve, reject) => {
//       //发起网络请求  
//       wx.request({
//         url: SERVER + API_LOGIN,
//         header: app.globalData.headers,
//         method: 'POST',
//         data: {
//           code: res.code
//         },
//         success: function (res) {
//           console.log(res)
//           if (checkApi(res.data)) {
//             var token = res.data.data.token
//             var uid = res.data.data.uid
//             var storeId = res.data.data.default_store
//             console.log(token)

//             //获取到用户凭证 存儲 3rd_session   
//             wx.setStorageSync('token', token)
//             wx.setStorageSync('uid', res.data.data.uid)
//             wx.setStorageSync('storeId', res.data.data.default_store)
//             app.globalData.token = token
//             app.globalData.uid = uid
//             app.globalData.storeId = storeId

//             return true
//           } else {
//             console.log('check api false')
//             return false
//           }
//         },
//         fail: function (res) {

//         }
//       })
//     })

//   },
