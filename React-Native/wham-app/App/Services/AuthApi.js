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
