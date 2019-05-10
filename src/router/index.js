import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '*', component: NotFound },
    ]
})