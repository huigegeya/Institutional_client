import request from '@/utils/request'



// 分页查询教师信息列表
export function listTeacherInfo() {
    return request({
        url: '/blog/teacherinfo/listTeacherInfo',
        method: 'get',
    })
}


// 添加教师信息
export function addTeacherInfo(teacherinfoQuery) {
    return request({
        url: '/blog/teacherinfo',
        method: 'post',
        data: teacherinfoQuery
    })
}

// 修改教师信息
export function updateTeacherInfo(teacherinfoQuery) {
    return request({
        url: '/blog/teacherinfo',
        method: 'put',
        data: teacherinfoQuery
    })
}

// 删除教师信息
export function deleteTeacherInfo(teacherId) {
    return request({
        url: '/blog/teacherinfo/' + teacherId,
        method: 'delete',
    })
}