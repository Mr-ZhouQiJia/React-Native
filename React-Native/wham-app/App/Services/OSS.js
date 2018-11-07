import AliyunOSS from 'aloestec-rn-oss'
import { fetchOssToken } from '../Services/UserApi'
import Helper from '../Lib/Helper'
import { ATModal } from 'aloestec-rn-components'
import throttle from 'lodash.throttle'

export function ossSendData (path, data, needLoading = false) {
  let loading = null
  needLoading && (loading =ATModal.loading({content: '请稍后...', backdropPressToClose: false}))
  return fetchOssToken().then(d => {
    if (d.StatusCode === '200') {
      const {AccessKeyId, AccessKeySecret, SecurityToken} = d
      AliyunOSS.initWithSecurityToken(SecurityToken, AccessKeyId, AccessKeySecret, 'oss-cn-shanghai.aliyuncs.com')
      return AliyunOSS.asyncUpload('test', path, data).then(d => {
        needLoading && loading.close()
        return 'success'
      })
    } else {
      needLoading && loading.close()
      return 'fail'
    }
  })
}

const emit = throttle(event => Helper.eventManage.emit('app/oss/progress', event), 500)

AliyunOSS.addEventListener('uploadProgress', emit)
