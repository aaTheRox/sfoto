import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '*', component: NotFound },
    ]
})