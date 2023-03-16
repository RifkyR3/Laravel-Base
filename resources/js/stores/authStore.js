import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";
import router from "@/router";

const apiUrl = '/api';
const csrfUrl = '/sanctum/csrf-cookie';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            authenticate: localStorage.getItem('auth'),
            user: localStorage.getItem('user') === '' ? null : JSON.parse(localStorage.getItem('user')),
            returnUrl: null
        };
    },
    actions: {
        async login(email, password) {
            try {
                await axios.get(csrfUrl);
                await axios
                    .post(apiUrl + '/login', {email, password})
                    .then((res) => {
                        this.getUser();
                        router.push(this.returnUrl || '/');
                    })
                    .catch((err) => {
                        throw err.response;
                    });
            } catch (e) {
                throw e;
            }
        },
        async logout() {
            await axios.get(csrfUrl);
            await axios.post(apiUrl + '/logout');

            this.authenticate = false;
            this.user = false;

            router.push('/');
        },
        async getUser() {
            await axios.get(apiUrl + '/user')
                .then((res) =>{
                    localStorage.setItem('user', JSON.stringify(res.data));
                    this.user = res.data;
                    localStorage.setItem('auth', true);
                    this.authenticate = true;
                })
                .catch((e) => {
                    throw e;
                });
        }
    }
})
