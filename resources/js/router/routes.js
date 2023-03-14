export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
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
