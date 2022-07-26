import request from '@/utils/request'

export function teacher(username) {
    return request({
        url: '/blog/teacher/' + username,
        method: 'get',
    })
}

export function listMySubjectInfo(Query) {
    return request({
        url: '/blog/teacher/listMySubjectInfo',
        method: 'get',
        params: Query
    })
}

// 修改密码
export function savepasswordt(passwordData) {
    return request({
        url: '/blog/teacher/savePasswordT',
        method: 'put',
        data: passwordData
    })
}

// 获取个人信息
export function getteacherinfo(username) {
    return request({
        url: '/blog/teacher/getTeacherInfo/' + username,
        method: 'get',
    })
}


// 修改
export function saveTeacher(userData) {
    return request({
        url: '/blog/teacher/saveTeacher',
        method: 'put',
        data: userData
    })
}