import { AsyncStorage } from 'react-native'
import URLSearchParams from 'url-search-params'
import md5 from 'blueimp-md5'
import { ATModal } from 'aloestec-rn-components'
import RNFetchBlob from 'react-native-fetch-blob'
import API from './API'
import Helper from '../Lib/Helper'

export function request (api, options = {}) {
  const pureApi = api
  const method = options.method ? options.method.toLowerCase() : 'get'
  const needToken = options.token !== undefined ? options.token : true
  options.data = options.data || {}
  // options.data.appVersion = Helper.APP_VERSION
  // options.data.appVersion = '1.2.9'
  const searchParams = makeURLSearchParams(options.data, options.requireSign)
  if (method === 'get') {
    api += '?' + searchParams
  }
  console.log('fetch:', api)
  return AsyncStorage.getItem('token/accessToken')
    .then(accessToken => {
      const headers = Object.assign(
        {'Content-Type': 'application/x-www-form-urlencoded'},
        needToken ? {'Authorization': 'Bearer ' + accessToken} : {},
        options.headers ? options.headers : {})
      return fetch(api, {
        method,
        body: method === 'post' ? searchParams : undefined,
        headers
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res
        } else {
          var error = new Error(res.statusText)
          error.res = res
          throw {
            msg: res.status + (res.statusText || ''),
            res: res
          }
        }
      })
      .then(res => res.json()).then(json => {
        const {code, data, msg} = json
        // console.log('json', json)
        if (Number(code) === 0) {
          return data
        } else {
          throw {
            code,
            msg: msg || '系统开小差啦'
          }
        }
      })
    }).catch(err => {
      console.log('eeee', err)
      let code = Number(err.code)
      if (code === 2) {
        // access_token过期，需要使用refresh_token刷新accesss_token
        console.log('Token过期')
        return refreshToken().then(() => {
          return request(pureApi, options)
        }).catch(err2 => {
          if ([3].indexOf(err2.code) > -1) {
            // refresh_token过期，需要重新登录
            /** ***********code 添加跳转登录界面****************/
            Helper.eventManage.emit('user/gotoLogin')
          } else {
            throw err2
          }
        })
      } else {
        /** ***********code 添加错误处理（用户可看）****************/
        throw err.msg ? err : {msg: '系统开小差啦'}
      }
    })
}

function refreshToken () {
  return AsyncStorage.getItem('token/refreshToken')
    .then(refreshToken => {
      return request(API.USER_REFRESH_TOKEN, {
        method: 'POST',
        data: {
          'refreshToken': refreshToken
        }
      }).then(d => {
        console.log('setTokenStorage')
        return setTokenStorage(d)
      }).catch(err => {
        console.log('refreshToken err')
        throw err
      })
    })
}

export function setTokenStorage (d) {
  return Promise.all([
    AsyncStorage.setItem('token/accessToken', d.accessToken),
    AsyncStorage.setItem('token/refreshToken', d.refreshToken),
    AsyncStorage.setItem('token/type', d.type)
  ])
}

export function removeTokenStorage () {
  return Promise.all([
    AsyncStorage.removeItem('token/accessToken'),
    AsyncStorage.removeItem('token/refreshToken'),
    AsyncStorage.removeItem('token/type')
  ])
}

export function fetchCreate (api, {
  method = 'get',
  delay = 0,
  defaultLoading = false,
  requireSign = false,
  extData = {},
  headers = {},
  loadingOptions = {content: '加载中...'},
  onError = null,
  onSuccess = null
}) {
  return async (data = {},
                loading = defaultLoading) => {
    let loadingMe
    loading && (loadingMe = ATModal.loading(loadingOptions))
    await Helper.sleep(delay)
    for(let key in headers){
      headers[key] = Helper[headers[key]]
    }
    return request(api, {
      method,
      data: Object.assign(data, extData),
      headers,
      requireSign
    }).then(d => {
      loading && loadingMe.close()
      if (onSuccess) {
        onSuccess(d)
      }
      return d
    }).catch(error => {
      loading && loadingMe.close()
      if (onError) {
        onError(error)
      } else {
        Helper.showToast(error.msg)
      }
      return 'fail'
    })
  }
}

export function fetchBlob (url, method = 'GET') {
  return RNFetchBlob
    .config({
      fileCache: false
    })
    .fetch(method, url)
}

let expir = 0
let nonce = 0

function createNonce (params) {
  let curTime = +new Date()
  if (expir < curTime) {
    nonce = Math.random()
    expir = curTime + 60 * 1000
  }
  return nonce
}

function makeURLSearchParams (obj, requireSign = false) {
  if (requireSign) {
    // 添加时间戳和随机数
    obj.timestamp = +new Date()
    obj.nonce = createNonce()

    // 按照参数名ASCII字典序排序
    let arr = []
    for (let i in obj) {
      arr.push({key: i, value: obj[i]})
    }
    arr = arr.sort((a, b) => {
      return (a.key + '' > b.key + '') ? 1 : -1
    })

    // 得到 stringSignTemp
    let p = new URLSearchParams()
    arr.forEach(item => {
      p.append(item.key, item.value)
    })
    const stringSignTemp = p.toString() + '&key=aloestec'

    // md5(stringSignTemp) 得到签名
    const sign = md5(stringSignTemp).toUpperCase()
    p.append('sign', sign)

    return p.toString()
  } else {
    let p = new URLSearchParams()
    for (let i in obj) {
      p.append(i, obj[i])
    }
    return p.toString()
  }
}
