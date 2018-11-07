import API from '../Services/API'

export default class Const {
  static BUNDLE_VERSION = '180920'
  static APP_STORE_ID = '123456'
  static regExp = {
    phone: /^1\d{10}$/,
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    paypassword: /^\d{6}$/,
    username: /^[A-Za-z0-9_\u4E00-\u9FA5\uE7C7-\uE7F3]{1,40}$/,
    smsCode: /^\d{6}$/,
    email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  }
  static URL = {
    signupAgreement: API.PREFIX + '/static/contract/signupAgreement.html'
  }
  static authIdMap = {
    email: 1,
    address: 2,
    realname: 3,
    bankcard: 4,
    promise: 5,
    occupation: 6,
    education: 7
  }

  static idcardTypeMap = {
    '1': '身份证',
    '2': '户口本',
    '3': '护照',
    '4': '军官证'
  }

  static orderStatusZhMap = {
    10: '交易进行中',
    20: '交易成功'
  }

  // 客服电话号码
  static helperPhone = [
    '12345678',
    '12345678'
  ]

  static ossPath = '/dukuai/'
}
