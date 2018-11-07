import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setHomeData: ['payload'],
  sagaHomeData: ['payload']
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  test: 'I am test data from HomeRedux'
})

/* ------------- Reducers ------------- */

export const setHomeData = (state, {payload}) => {
  return state.merge({
    test: payload
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_HOME_DATA]: setHomeData
})
