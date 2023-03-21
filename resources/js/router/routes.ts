import { useAuthStore } from '@/stores'

export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: { layout: 'empty' }
    },
    {
        path: '/logout',
        name: 'Logout',
        beforeEnter: async () => {
            await useAuthStore().logout()
        },
        redirect: '/login'
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue')
    },
    {
        path: '/other',
        name: 'Other',
        component: () => import('../views/OtherView.vue')
    }
]
