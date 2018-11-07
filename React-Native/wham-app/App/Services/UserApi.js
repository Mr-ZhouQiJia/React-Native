import API from './API'
import { request, setTokenStorage, fetchCreate, fetchBlob } from './fetch'
import Helper from '../Lib/Helper'
import { ATModal } from 'aloestec-rn-components'

const postParams = {
  method: 'post',
  defaultLoading: true,
  backdropPressToClose: false,
  loadingOptions: {content: '提交中...'}
}

export const fetchSmsCode = fetchCreate(API.APP_SMSCODE, {
  method: 'post',
  defaultLoading: true,
  loadingOptions: {content: '发送中...'},
  headers: {
    UserAgent: 'APP_USER_AGENT',
    DeviceId: 'APP_UNIQUE_ID',
  }
})

export const fetchSmsCodeCheck = fetchCreate(API.APP_SMSCODE_CHECK, {
  method: 'post',
  defaultLoading: true,
})

export const fetchSignup = fetchCreate(API.APP_SIGNUP, {
  method: 'post',
  defaultLoading: true,
})

export const fetchResetSmscode = fetchCreate(API.APP_REST_SMSCODE, {
  method: 'post',
  defaultLoading: true,
})

export const fetchResetPassword = fetchCreate(API.APP_REST_PASSWORD, {
  method: 'post',
  defaultLoading: true,
})

export const fetchModifyPassword = fetchCreate(API.APP_MODIFY_PASSWORD, {
  method: 'post',
  defaultLoading: true,
})

export async function fetchLogin (params) {
  let loading = ATModal.loading({content: '登录中...'})
  return request(API.APP_LOGIN, {
    method: 'post',
    data: params
  }).then((data) => {
    loading.close()
    return setTokenStorage(data)
  }).catch((error) => {
    loading.close()
    Helper.showToast(error.msg)
    return 'fail'
  })
}

export async function fetchCosObject (params = {}, isJson = false) {
  return request(API.APP_COS_OBJECT, {
    data: params
  }).then((data) => {
    if (isJson) {
      return fetchBlob(data).then(res => {
        return res.json()
      })
    } else {
      return data
    }
  }).catch((error) => {
    ATModal.toast({content: error.msg})
    return 'fail'
  })
}

export const fetchUserInfo = fetchCreate(API.APP_CUSTOMER_INFO, {})
export const fetchUserAccount = fetchCreate(API.APP_CUSTOMER_ACCOUNT, {})
export const fetchUserProDetail = fetchCreate(API.APP_CUSTOMER_PRO_DETAIL, {})
export const fetchUserBankCard = fetchCreate(API.APP_AUTH_BANKCARD, {defaultLoading: true})
export const fetchAuthData = fetchCreate(API.APP_AUTH_DATA, {})
export const fetchAuthDetail = fetchCreate(API.APP_AUTH_DETAIL_AUTH, {})
export const fetchAuthEmailAddr = fetchCreate(API.APP_AUTH_EMAIL_ADDR, {})
export const fetchAuthEmailAdd = fetchCreate(API.APP_AUTH_EMAIL_ADD, postParams)
export const fetchAuthAddressAdd = fetchCreate(API.APP_AUTH_ADDRESS_ADD, postParams)
export const fetchAuthRealnameAdd = fetchCreate(API.APP_AUTH_REALNAME_ADD, postParams)
export const fetchAuthEdAdd = fetchCreate(API.APP_AUTH_ED_ADD, postParams)
export const fetchAuthWorkdAdd = fetchCreate(API.APP_AUTH_WORK_ADD, postParams)
export const fetchAuthBankCardAdd = fetchCreate(API.APP_AUTH_BANKCARD_ADD, postParams)
export const fetchAuthPromiseAdd = fetchCreate(API.APP_AUTH_PROMISE_ADD, postParams)
export const fetchOssToken = fetchCreate(API.APP_OSS_TOKEN, {})
export const fetchCosToken = fetchCreate(API.APP_COS_TOKEN, {})
// export const fetchOssObejct = fetchCreate(API.APP_OSS_OBJECT, {})
// export const fetchCosObject = fetchCreate(API.APP_COS_OBJECT, {})
export const fetchVersionAndroid = fetchCreate(API.APP_VERSION_ANDROID, {defaultLoading: true})
export const fetchVersionIOS = fetchCreate(API.APP_VERSION_IOS, {defaultLoading: true})
