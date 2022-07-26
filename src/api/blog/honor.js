import request from '@/utils/request'

// 分页查询荣誉墙列表
export function listHonor(honorQuery) {
    return request({
        url: '/blog/honor/listPage',
        method: 'get',
        params: honorQuery
    })
}




// 添加荣誉墙
export function addHonor(honorQuery) {
    return request({
        url: '/blog/honor/addHonor',
        method: 'post',
        data: honorQuery
    })
}
