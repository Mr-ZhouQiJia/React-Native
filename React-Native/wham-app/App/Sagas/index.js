import { takeLatest, all } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { HomeTypes } from '../Redux/HomeRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { sagaHomeData } from './HomeSagas'
import { sagaUserLogout, sagaUserAddrList } from './UserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(HomeTypes.SAGA_HOME_DATA, sagaHomeData),

    takeLatest(UserTypes.SAGA_USER_LOGOUT, sagaUserLogout),
    takeLatest(UserTypes.SAGA_USER_ADDR_LIST, sagaUserAddrList)

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
