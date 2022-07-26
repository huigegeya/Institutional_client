import request from '@/utils/request'

export function admin(username) {
    return request({
        url: '/blog/admin/' + username,
        method: 'get',
    })
}

export function savepassworda(passwordData) {
    return request({
        url: '/blog/admin/savePasswordA',
        method: 'put',
        data: passwordData
    })
}
