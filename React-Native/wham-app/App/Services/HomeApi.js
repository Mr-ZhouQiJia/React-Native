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

export const fetchBannerList = fetchCreate(API.APP_BANNER_LIST, {})
export const fetchProductList = fetchCreate(API.APP_INDEX_PRODUCT_LIST, {})