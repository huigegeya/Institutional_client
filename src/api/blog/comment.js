import request from '@/utils/request'

// 分页查询某文章的评论列表
export function listComment(commentQuery) {
    return request({
        url: '/blog/comment/listPage',
        method: 'get',
        params: commentQuery
    })
}

// 添加评论
export function addComment(comment) {
    return request({
        url: '/blog/comment',
        method: 'post',
        data: comment
    })
}

export function delComment(id) {
    return request({
        url: '/blog/comment/' + id,
        method: 'delete',
    })
}