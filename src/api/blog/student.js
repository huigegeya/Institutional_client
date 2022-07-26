import request from '@/utils/request'

export function student(username) {
    return request({
        url: '/blog/student/' + username,
        method: 'get',
    })
}

export function savepassword(passwordData) {
    return request({
        url: '/blog/student/savepassword',
        method: 'put',
        data: passwordData
    })
}

export function apply(applyData) {
    return request({
        url: '/blog/student/apply',
        method: 'post',
        data: applyData
    })
}

export function myapply(Query) {
    return request({
        url: '/blog/student/myapply',
        method: 'get',
        params: Query
    })
}

// 获取个人信息
export function getuserinfo(username) {
    return request({
        url: '/blog/student/getuserinfo/' + username,
        method: 'get',
    })
}


// 修改
export function saveUser(userData) {
    return request({
        url: '/blog/student/saveUser',
        method: 'put',
        data: userData
    })
}