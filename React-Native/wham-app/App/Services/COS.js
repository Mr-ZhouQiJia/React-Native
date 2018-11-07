import AliyunOSS from 'aloestec-rn-oss'
import { ATModal } from 'aloestec-rn-components'
import { fetchCosToken } from '../Services/UserApi'
import Helper from '../Lib/Helper'
import throttle from 'lodash.throttle'

export function cosSendData (path, data, needLoading = false) {
  return fetchCosToken().then(d => {
    if (d !== 'fail') {
      console.log(d)
      return d
    } else {
      return 'fail'
    }
  })
}

const emit = throttle(event => Helper.eventManage.emit('app/oss/progress', event), 500)

AliyunOSS.addEventListener('uploadProgress', emit)
