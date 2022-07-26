import request from '@/utils/request'

// 修改密码
export function savepassword(passwordData) {
    return request({
        url: '/savepassword',
        method: 'put',
        data: passwordData
    })
}

// 获取个人信息
export function getuserinfo(username) {
    return request({
        url: '/getuserinfo/' + username,
        method: 'get',
    })
}


// 修改
export function saveUser(userData) {
    return request({
        url: '/saveUser',
        method: 'put',
        data: userData
    })
}