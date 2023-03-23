import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'

import routePublic from '@/router/routesPublic'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name:'Home',
            component: () => import('../views/OtherView.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/LoginView.vue'),
            meta: { layout: 'empty' }
        },
        {
            path: '/logout',
            name: 'Logout',
            component: async () => {
                await useAuthStore().logout()
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('../views/DashboardView.vue')
        },
        {
            path: '/other',
            name: 'Other',
            component: () => import('../views/OtherView.vue')
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: () => import('../views/404View.vue')
        },
    ]
})

router.beforeEach(async (to) => {

    // redirect to login page if not logged in and trying to access a restricted page
    const authRequired = !routePublic.includes(to.path)
    const auth = useAuthStore()

    if (authRequired && !auth.authenticate) {
        auth.returnUrl = to.fullPath
        return '/login'
    }
})

export default router
