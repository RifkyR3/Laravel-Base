import {useAuthStore} from "@/stores";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

async function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url:string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const tokenData = useAuthStore().token;
    if (tokenData === '') {
        return { Authorization: `Bearer ${tokenData}` };
    } else {
        return {};
    }
}

function handleResponse(response:Response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && useAuthStore().user) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                useAuthStore().logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
