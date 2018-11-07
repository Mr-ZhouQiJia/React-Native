import IP from '../Config/IPConfig'
const PREFIX = IP
// const PREFIX = 'http://192.168.6.168:8401'
console.log('API ON:', PREFIX)
export default class API {

  static PREFIX = PREFIX
  // 刷新token
  static USER_REFRESH_TOKEN = PREFIX + '/app/customer/refreshToken'

  // 获取验证码
  static APP_SMSCODE = PREFIX + '/app/pub/register/smsCode'
  // 验证码校验
  static APP_SMSCODE_CHECK = PREFIX + '/app/pub/register/check'
  // 注册
  static APP_SIGNUP = PREFIX + '/app/pub/register'
  // 登录
  static APP_LOGIN = PREFIX + '/app/pub/login'
  // 重置密码的短信验证码
  static APP_REST_SMSCODE = PREFIX + '/app/pub/reset/smsCode'
  // 重置密码
  static APP_REST_PASSWORD = PREFIX + '/app/pub/reset/password'
  // 修改密码
  static APP_MODIFY_PASSWORD = PREFIX + '/app/customer/modify/password'

  // banner 列表
  static APP_BANNER_LIST = PREFIX + '/app/pub/banner/list'

  // 首页产品列表
  static APP_INDEX_PRODUCT_LIST = PREFIX + '/app/pub/index/product/list'
  // 产品列表
  static APP_PRODUCT_LIST = PREFIX + '/app/pub/product/list'
  // 产品详情
  static APP_PRODUCT_DETAIL = PREFIX + '/app/pub/product/detail'
  // 产品统计
  static APP_PRODUCT_COUNT = PREFIX + '/app/pub/product/count'
  // 产品购买
  static APP_PRODUCT_BUY = PREFIX + '/app/order/add'

  // 我的
  // 个人信息
  static APP_CUSTOMER_INFO = PREFIX + '/app/customer/info'
  static APP_AUTH_DATA = PREFIX + '/app/customerAuth/data'
  static APP_AUTH_BANKCARD = PREFIX + '/app/customerAuth/bankCard'
  static APP_AUTH_EMAIL_ADDR = PREFIX + '/app/customerAuth/emailAndAddress'
  static APP_AUTH_DETAIL_AUTH = PREFIX + '/app/customerAuth/detailAuth'
  static APP_AUTH_EMAIL_ADD = PREFIX + '/app/customerAuth/email/add'
  static APP_AUTH_ADDRESS_ADD = PREFIX + '/app/customerAuth/address/add'
  static APP_AUTH_REALNAME_ADD = PREFIX + '/app/customerAuth/realname/add'
  static APP_AUTH_ED_ADD = PREFIX + '/app/customerAuth/education/add'
  static APP_AUTH_WORK_ADD = PREFIX + '/app/customerAuth/occupation/add'
  static APP_AUTH_BANKCARD_ADD = PREFIX + '/app/customerAuth/bankCard/add'
  static APP_AUTH_PROMISE_ADD = PREFIX + '/app/customerAuth/promise/add'

  static APP_CUSTOMER_ACCOUNT = PREFIX + '/app/customer/account'
  static APP_CUSTOMER_PRO_DETAIL = PREFIX + '/app/customer/product/detail'

  // 获取ossToken
  static APP_OSS_TOKEN = PREFIX + '/app/oss/token'
  static APP_COS_TOKEN = PREFIX + '/app/cos/token'
  static APP_OSS_OBJECT = PREFIX + '/app/oss/object'
  static APP_COS_OBJECT = PREFIX + '/app/cos/object'

  static APP_VERSION_IOS = PREFIX + '/app/pub/version/ios'
  static APP_VERSION_ANDROID = PREFIX + '/app/pub/version/android'

}
