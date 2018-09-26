import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/home/index'
import Substitute from '@/views/substitute/index'
import Course from '@/views/course/index'
import Publish from '@/views/publish/index'
import Mine from '@/views/mine/index'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: '/login',
            component: Login
        },
        {
            path: '/home',
            name: '/home',
            component: Home,
            children : [
                {
                    path: '/home',
                    redirect: '/home/mine'
                },
                {
                    path: '/home/substitute',
                    name: 'substitute',
                    component: Substitute
                },
                {
                    path: '/home/course',
                    name: 'course',
                    component: Course
                },
                {
                    path: '/home/publish',
                    name: 'publish',
                    component: Publish
                },
                {
                    path: '/home/mine',
                    name: 'mine',
                    component: Mine
                }
            ]
        }
    ]
})