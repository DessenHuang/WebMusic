import { createRouter, createWebHistory } from "vue-router"
import { Store } from '/src/store/index.js'

const routes = [
    {
        path: '/',
        component: () => import('/src/views/Layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import('/src/views/Layout/Home/index.vue')
            }
        ]
    },
    {
        path: '/itemmusic',
        component: () => import('/src/views/ItemMusic/index.vue')
    },
    {
        path: '/search',
        component: () => import('/src/views/Search/index.vue')
    },
    {
        path: '/login',
        // 已登录状态下禁止跳转login页面
        beforeEnter: (to, from, next) => {
            const store = Store()
            if (store.isLogin) {
                next('/')
            } else {
                next()
            }
        },
        component: () => import('/src/views/Login/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局路由 
router.beforeEach((to, from) => {
    const store = Store()
    // 访问login页面时隐藏底部栏
    if (to.path === '/login') {
        store.isFooterShow = false
    } else {
        store.isFooterShow = true
    }

    // 若存在cookie，则更新登陆状态
    if (to.path === '/home' && sessionStorage.getItem('isLogin')) {
        store.isLogin = sessionStorage.getItem('isLogin')
    }
})

export default router