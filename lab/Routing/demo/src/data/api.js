const host = 'http://localhost:3030'

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if(data) {
        options.headers['Content-Type'] = 'applications/json'
        options.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(host + url, options)

        if (response.ok != true) {
            const error = await response.json()
            throw new Error(error.message)
        }

        if (response.status == 204) {
            return response
        } else {
            return response.json()
        }
    } catch (err) {
        alert(err.message)
        throw err
    }
}

export function get(url) {
    return request('get', url)
}

export function post(url) {
    return request('post', url)
}

export function put(url) {
    return request('put', url)
}

export function del(url) {
    return request('delete', url)
}