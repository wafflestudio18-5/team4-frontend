/* eslint-disable default-case */
// Login 관련 Actions
export const Login = (payload) => {
    return {
        type: "LOGIN",
        payload: payload
    }
}

export const Logout = () => {
    return {
        type: "LOGOUT"
    }
}

//User info 관련 Actions
export const setUserInfo = (payload) => {
    return {
        type: "SET_USER_INFO"
    }
}

export const removeUserInfo = () => {
    return {
        type: "REMOVE_USER_INFO"
    }
}


export const isLoggedReducer = (state={loggedin: false, token: null}, action) => {
    switch(action.type) {
        case "LOGIN":
            return {loggedin: true, token: action.payload.token}
        case "LOGOUT":
            return {loggedin : false, token: ""}
        default:
            return state
    }
}

const defaultUserInfo = {
    "id": "",
  "username": "",
  "token" : "",
  "created_at": "",
  "updated_at": "",
  "email": "",
  "last_login": "",
  "nickname": "",
  "picture": "",
  "reputation": 0,
  "title":"",
  "intro":"",
  "question_count": 0,
  "answer_count":0,
  "bookmark_count":0
}

export const userInfoReducer = (state = defaultUserInfo, action) => {
    switch (action.type) {
        case "SET_USER_INFO" :
            return action.payload.user
        case "REMOVE_USER_INFO" :
            return defaultUserInfo
        default:
            return state
    }
}