import { getLocalData, removeLocalData, setLocalData } from "./cache";

const TOKEN_KEY = 'jwt-token'
const USER_INFO_KEY = 'user-info'
const TOKEN_KEY1 = 'jwt-token1'
const USER_INFO_KEY1 = 'user-info1'
const TOKEN_KEY2 = 'jwt-token2'
const USER_INFO_KEY2 = 'user-info2'
export function getToken() {
    return getLocalData(TOKEN_KEY)
}

export function setToken(token) {
    setLocalData(TOKEN_KEY, token)
}

export function removeToken() {
    removeLocalData(TOKEN_KEY)
}

export function getUserInfo() {
    let userInfoStr = getLocalData(USER_INFO_KEY)
    if (userInfoStr) {
        return JSON.parse(userInfoStr)
    }
    return null
}

export function setUserInfo(userInfo) {
    setLocalData(USER_INFO_KEY, JSON.stringify(userInfo))
}

export function removeUserInfo() {
    removeLocalData(USER_INFO_KEY)
}




export function getToken1() {
    return getLocalData(TOKEN_KEY1)
}

export function setToken1(token) {
    setLocalData(TOKEN_KEY1, token)
}

export function removeToken1() {
    removeLocalData(TOKEN_KEY1)
}

export function getUserInfo1() {
    let userInfoStr = getLocalData(USER_INFO_KEY1)
    if (userInfoStr) {
        return JSON.parse(userInfoStr)
    }
    return null
}

export function setUserInfo1(userInfo) {
    setLocalData(USER_INFO_KEY1, JSON.stringify(userInfo))
}

export function removeUserInfo1() {
    removeLocalData(USER_INFO_KEY1)
}


export function getToken2() {
    return getLocalData(TOKEN_KEY2)
}

export function setToken2(token) {
    setLocalData(TOKEN_KEY2, token)
}

export function removeToken2() {
    removeLocalData(TOKEN_KEY2)
}

export function getUserInfo2() {
    let userInfoStr = getLocalData(USER_INFO_KEY2)
    if (userInfoStr) {
        return JSON.parse(userInfoStr)
    }
    return null
}

export function setUserInfo2(userInfo) {
    setLocalData(USER_INFO_KEY2, JSON.stringify(userInfo))
}

export function removeUserInfo2() {
    removeLocalData(USER_INFO_KEY2)
}