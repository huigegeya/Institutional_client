import request from '@/utils/request'

// 注册
export function register(registerData) {
    return request({
        url: '/register',
        method: 'post',
        data: registerData
    })
}

export function teacherRegister(registerData) {
    return request({
        url: '/teacherRegister',
        method: 'post',
        data: registerData
    })
}
