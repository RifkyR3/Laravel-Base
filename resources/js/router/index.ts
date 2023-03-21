import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'

import routes from '@/router/routes'
import routesPublic from '@/router/routesPublic'

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach(async (to) => {

    // redirect to login page if not logged in and trying to access a restricted page
    const authRequired = !routesPublic.includes(to.path)
    const auth = useAuthStore()

    if (authRequired && !auth.authenticate) {
        auth.returnUrl = to.fullPath
        return '/login'
    }
})

export default router
