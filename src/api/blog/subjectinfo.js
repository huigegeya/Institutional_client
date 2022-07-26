import request from '@/utils/request'

// 分页查询文章信息列表
export function listArticle(articleQuery) {
    return request({
        url: '/blog/article/listPage',
        method: 'get',
        params: articleQuery
    })
}

// 分页查询课程信息列表
export function listSubjectInfo(subjectinfoQuery) {
    return request({
        url: '/blog/subjectinfo/listSubjectInfo',
        method: 'get',
        params: subjectinfoQuery
    })
}


// 获取课程详细信息
export function getSubjectInfoDetail(subjectId) {
    return request({
        url: '/blog/subjectinfo/' + subjectId,
        method: 'get',
    })
}

// 添加课程信息
export function addSubjectInfo(subjectinfoQuery) {
    return request({
        url: '/blog/subjectinfo',
        method: 'post',
        data: subjectinfoQuery
    })
}

// 修改课程信息
export function updateSubjectInfo(subjectinfoQuery) {
    return request({
        url: '/blog/subjectinfo',
        method: 'put',
        data: subjectinfoQuery
    })
}

// 删除课程信息
export function deleteSubjectInfo(subjectIds) {
    return request({
        url: '/blog/subjectinfo/' + subjectIds,
        method: 'delete',
    })
}