import { defineStore } from 'pinia'
import router from '@/router'
import { apiHelper, getCsrf } from '@/helpers/apiHelper'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            authenticate: localStorage.getItem('auth') ? (localStorage.getItem('auth') == '1') : false,
            user: JSON.parse(localStorage.getItem('user') || '{}'),
            returnUrl: ''
        }
    },

    actions: {
        async login(email: string, password: string) {
            try {
                await getCsrf()
                await apiHelper.post('/login', { email, password })
                    .then((res) => {
                        this.getUser()
                    })
            } catch (error) {
                // showTooltip(error)
                // let the form component display the error
                return error
            }
        },

        async logout() {
            this.authenticate = false
            this.user = null

            localStorage.removeItem('auth')
            localStorage.removeItem('user')

            await getCsrf()
            await apiHelper.post('/logout')
            return await router.push('/login')
        },

        async getUser() {
            await getCsrf()
            await apiHelper.get('/user')
                .then((res) => {
                    this.user = res
                    this.authenticate = true
                    localStorage.setItem('auth', '1')
                    localStorage.setItem('user', JSON.stringify(res))
                })

            // redirect to previous url or default to home page
            return await router.push(this.returnUrl || '/dashboard')
        }
    }
})
