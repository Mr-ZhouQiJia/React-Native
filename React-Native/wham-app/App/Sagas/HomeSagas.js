import { put } from 'redux-saga/effects'
import { fetchHomeData } from '../Services/HomeApi'
import HomeAction from '../Redux/HomeRedux'

export function * sagaHomeData () {
  const res = yield fetchHomeData()
  yield put(HomeAction.setHomeData(res.data))
}
