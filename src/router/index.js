import Vue from 'vue'
import VueRouter from 'vue-router'

import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Member from '@/views/member'
import teacher from '@/views/teacher'
import admin from '@/views/admin';
import { getToken, getToken1, getToken2 } from "@/utils/auth";
import subjectInfo from '@/views/member/subjectInfo'
import subjectAdd from '@/views/admin/subjectAdd'
import ChangePwd from '@/views/member/ChangePwd'
import User from '@/views/member/User'
import teacherInfo from '@/views/member/teacherInfo'
import exeStudent from '@/views/member/exeStudent'
import comment from '@/views/member/comment'
import start from '@/views/start';
import subjectInfoTeacher from '@/views/teacher/subjectInfoTeacher'
import changePwd1 from '@/views/teacher/changePwd1'
import comment1 from '@/views/teacher/comment1'
import User1 from '@/views/teacher/User1'
import teacherInfo1 from '@/views/teacher/teacherInfo1'
import exeStudent1 from '@/views/teacher/exeStudent1'
import changePwd2 from '@/views/admin/changePwd2';
import comment2 from '@/views/admin/comment2'
import exeStudent2 from '@/views/admin/exeStudent2'
import exeStudentAdd from '@/views/admin/exeStudentAdd'
import subjectInfoManage from '@/views/admin/subjectInfoManage'
import teacherAdd from '@/views/admin/teacherAdd'
import teacherInfo2 from '@/views/admin/teacherInfo2'
import addHonor from '@/views/admin/addHonor'
import mySubject from '@/views/member/mySubject';
import mySubject1 from '@/views/teacher/mySubject1';
import addTeacherCount from '@/views/admin/addTeacherCount';
Vue.use(VueRouter)

// 子路由的path不能有"/"
const routes = [
    {
        path: '',
        name: 'start',
        component: start,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/member',
        name: 'Member',
        component: Member,
        redirect: '/member/subjectInfo',
        children: [
            {
                path: 'subjectInfo',
                name: 'subjectInfo',
                component: subjectInfo,
            },
            {
                path: 'changePwd',
                name: 'ChangePwd',
                component: ChangePwd,
            },
            {
                path: 'user',
                name: 'User',
                component: User,
            },
            {
                path: 'teacherInfo',
                name: 'teacherInfo',
                component: teacherInfo,
            },
            {
                path: 'exeStudent',
                name: 'exeStudent',
                component: exeStudent,
            },
            {
                path: 'comment',
                name: 'comment',
                component: comment,
            },
            {
                path: 'mySubject',
                name: 'mySubject',
                component: mySubject,
            },

        ]
    },
    {
        path: '/teacher',
        name: 'teacher',
        component: teacher,
        redirect: '/teacher/subjectInfoTeacher',
        children: [
            {
                path: 'comment1',
                name: 'comment1',
                component: comment1,
            },
            {
                path: 'user1',
                name: 'User1',
                component: User1,
            },
            {
                path: 'subjectInfoTeacher',
                name: 'subjectInfoTeacher',
                component: subjectInfoTeacher,
            },
            {
                path: 'changePwd1',
                name: 'changePwd1',
                component: changePwd1,
            },

            {
                path: 'exeStudent1',
                name: 'exeStudent1',
                component: exeStudent1,
            },
            {
                path: 'teacherInfo1',
                name: 'teacherInfo1',
                component: teacherInfo1,
            },
            {
                path: 'mySubject1',
                name: 'mySubject1',
                component: mySubject1,
            },
        ]

    },
    {
        path: '/admin',
        name: 'admin',
        component: admin,
        redirect: '/admin/subjectInfoManage',
        children: [
            {
                path: 'comment2',
                name: 'comment2',
                component: comment2,
            },

            {
                path: 'changePwd2',
                name: 'changePwd2',
                component: changePwd2,
            },


            {
                path: 'subjectInfoManage',
                name: 'subjectInfoManage',
                component: subjectInfoManage,
            },

            {
                path: 'teacherInfo2',
                name: 'teacherInfo2',
                component: teacherInfo2,
            },
            {
                path: 'teacherAdd',
                name: 'teacherAdd',
                component: teacherAdd,
                props: true
            },
            {
                path: 'exeStudent2',
                name: 'exeStudent2',
                component: exeStudent2,
            },
            {
                path: 'exeStudentAdd',
                name: 'exeStudentAdd',
                component: exeStudentAdd,
                props: true
            },
            {
                path: 'subjectAdd/:subjectId',
                name: 'subjectAdd',
                component: subjectAdd,
                props: true
            },
            {
                path: 'addHonor',
                name: 'addHonor',
                component: addHonor,
            },
            {
                path: 'addTeacherCount',
                name: 'addTeacherCount',
                component: addTeacherCount
            },
        ]

    },
]


const router = new VueRouter({
    // mode: "history",
    // base: "/Institutional_client",
    routes
})


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
    console.log(to.path)
    if (to.matched) {
        if (to.path.startsWith('/member') && !getToken() || to.path.startsWith('/teacher') && !getToken1() || to.path.startsWith('/admin') && !getToken2())
            next({ path: '/login', query: { fromPath: to.path } })
        else next()
    } else {
        next()
    }
})


export default router
