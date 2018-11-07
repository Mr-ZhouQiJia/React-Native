import { put } from 'redux-saga/effects'
import { fetchAddressList } from '../Services/UserApi'
import UserAction from '../Redux/UserRedux'

import Helper from "../Lib/Helper";

export function * sagaUserLogout () {
  yield put(UserAction.setUserLogin(false))
  yield put(UserAction.setUserInfo({}))
}

export function * sagaUserAddrList () {
  const res = yield fetchAddressList()
  yield put(UserAction.setUserAddrList(res))  
}