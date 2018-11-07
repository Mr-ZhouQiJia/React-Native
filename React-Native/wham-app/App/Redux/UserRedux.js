import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setUserInfo: ['payload'],
  setUserLogin: ['payload'],
  setUserAddrList: ['payload'],
  sagaUserLogout: ['payload'],
  sagaUserAddrList: ['payload'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userInfo: {},
  isLogin: false,
  userAddrList: [],
})

/* ------------- Reducers ------------- */

export const setUserInfo = (state, {payload = {}}) => {
  return state.merge({
    userInfo: payload
  })
}
export const setUserLogin = (state, {payload = {}}) => {
  return state.merge({
    isLogin: payload
  })
}
export const setUserAddrList = (state, {payload = {}}) => {
  return state.merge({
    userAddrList: payload
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER_INFO]: setUserInfo,
  [Types.SET_USER_LOGIN]: setUserLogin,
  [Types.SET_USER_ADDR_LIST]: setUserAddrList,
})
