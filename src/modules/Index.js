import {isLoggedReducer, userInfoReducer} from './AuthRedux'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    isLoggedReducer,
    userInfoReducer
})

export default rootReducer