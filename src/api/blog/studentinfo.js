import request from '@/utils/request'



// 分页查询优秀学员信息列表
export function listStudentInfo() {
    return request({
        url: '/blog/studentinfo/listStudentInfo',
        method: 'get',
    })
}


// 添加优秀学员信息
export function addStudentInfo(StudentinfoQuery) {
    return request({
        url: '/blog/studentinfo',
        method: 'post',
        data: StudentinfoQuery
    })
}

// 修改优秀学员信息
export function updateStudentInfo(StudentinfoQuery) {
    return request({
        url: '/blog/studentinfo',
        method: 'put',
        data: StudentinfoQuery
    })
}

// 删除优秀学员信息
export function deleteStudentInfo(stuId) {
    return request({
        url: '/blog/studentinfo/' + stuId,
        method: 'delete',
    })
}