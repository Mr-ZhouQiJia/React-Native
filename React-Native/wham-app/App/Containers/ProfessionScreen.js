import React, { Component } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GlobalStyle } from '../Themes'
import { ATButton, ATSelect } from 'aloestec-rn-components'
import { Header } from '../Components'
import Helper from '../Lib/Helper'
import { fetchAuthData, fetchAuthWorkdAdd } from '../Services/UserApi'
import Const from '../Lib/Const'

export default class ProfessionScreen extends Component {
  state = {
    work: ''
  }

  submit = () => {
    const {work} = this.state
    if (work === '') {
      Helper.showToast('请选择职业')
      return
    }
    return fetchAuthWorkdAdd({
      authInfo: JSON.stringify({
        work
      })
    }).then(d => {
      if (d !== 'fail') {
        this.props.navigation.goBack(null)
      }
    })
  }

  getInfo = () => {
    return fetchAuthData({authId: Const.authIdMap.occupation}).then(d => {
      if (d !== 'fail' && d) {
        let authInfo = JSON.parse(d.authInfo)
        this.setState({
          work: authInfo.work
        })
      }
    })
  }

  componentDidMount () {
    this.getInfo()
  }

  render () {
    return (
      <View style={GlobalStyle.screen}>
        <Header
          title='职业属性'
          headerRight={<ATButton title='完成' ghost style={{borderWidth: 0}} onPress={this.submit} />}
        />
        <KeyboardAwareScrollView alwaysBounceVertical={false}>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <ATSelect
              value={this.state.work}
              options={[
                {label: '农业', value: '农业'},
                {label: '艺术家/表演家', value: '艺术家/表演家'},
                {label: '商业', value: '商业'},
                {label: '通信', value: '通信'},
                {label: '计算机科学', value: '计算机科学'},
                {label: '烹饪/食品服务', value: '烹饪/食品服务'},
                {label: '教育', value: '教育'},
                {label: '工程', value: '工程'},
                {label: '政府', value: '政府'},
                {label: '法律行业', value: '法律行业'},
                {label: '医疗/健康', value: '医疗/健康'},
                {label: '军事', value: '军事'},
                {label: '自然科学', value: '自然科学'},
                {label: '待业', value: '待业'},
                {label: '物理学', value: '物理学'},
                {label: '宗教职业', value: '宗教职业'},
                {label: '研究', value: '研究'},
                {label: '自由职业', value: '自由职业'},
                {label: '退休', value: '退休'},
                {label: '社会科学', value: '社会科学'},
                {label: '学生', value: '学生'},
                {label: '其他', value: '其他'}
              ]}
              onChange={(v) => {
                this.setState({work: v})
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
