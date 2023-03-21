import axios from 'axios'

export const API_URL = '/api'
export const API_CSRF = '/sanctum/csrf-cookie'

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
}
export const apiHelper = axios.create({
    baseURL: API_URL,
    withCredentials: true, // required to handle the CSRF token
    headers: headers
})

export async function getCsrf() {
    await axios.get(API_CSRF, { headers: headers })
}

/*
 * Add a response interceptor
 */
apiHelper.interceptors.response.use(
    (response) => {
        return response.data
    },
    function(error) {
        return Promise.reject(error)
    }
)
