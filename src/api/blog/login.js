import request from '@/utils/request'

// 登录
export function login(loginData) {
    return request({
        url: '/login',
        method: 'post',
        data: loginData
    })
}

// 获取登录用户信息
export function getLoggedInUserInfo() {
    return request({
        url: '/getLoggedInUserInfo',
        method: 'get',
    })
}
export function getLoggedInUserInfo1() {
    return request({
        url: '/getLoggedInUserInfo1',
        method: 'get',
    })
}
export function getLoggedInUserInfo2() {
    return request({
        url: '/getLoggedInUserInfo2',
        method: 'get',
    })
}

// 登出
export function logout() {
    return request({
        url: '/logout',
        method: 'get',
    })
}