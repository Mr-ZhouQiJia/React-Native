import API from './API'
import { fetchCreate } from './fetch'

const postParams = {
  method: 'post',
  defaultLoading: true,
  loadingOptions: {
    content: '提交中...',
    backdropPressToClose: false
  }
}

export const fetchProductList = fetchCreate(API.APP_PRODUCT_LIST, { })
export const fetchProductDetail = fetchCreate(API.APP_PRODUCT_DETAIL, { defaultLoading: true, })
export const fetchProductCount = fetchCreate(API.APP_PRODUCT_COUNT, { defaultLoading: true, })
export const fetchProductBuy = fetchCreate(API.APP_PRODUCT_BUY, postParams)