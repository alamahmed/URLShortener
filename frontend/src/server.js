const backendURL = process.env.REACT_APP_BACKEND_URL;

const getshortenedURL = (url, token, setLoading) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', backendURL, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (token === null)
        token = ''
    xhr.send(JSON.stringify({ 'url': url, 'token': token }))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            let display = document.getElementById('display_short_url')
            display.innerHTML = backendURL + response.URL
            display.href = backendURL + response.URL
            setLoading(false)
        }
    }
};

const sign_up = (fullName, email, password, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', backendURL + 'signup', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    const data = { fullName: fullName, email: email, password: password }
    xhr.send(JSON.stringify(data))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            callback(response)
        }
    }
};

const log_in = (email, password, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', backendURL + 'login', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    const data = { email: email, password: password }
    xhr.send(JSON.stringify(data))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            callback(response)
        }
    }
};

const get_data = (uid, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', backendURL + 'get_data', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    const data = { uid: uid }
    xhr.send(JSON.stringify(data))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            callback(response)
        }
    }
}

const delete_url = (url_to_del, token, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', backendURL + 'del_url_from_user', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (token === null)
        token = ''
    xhr.send(JSON.stringify({ 'url': url_to_del, 'token': token }))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            callback(response)
        }
    }
}

const update_username = (username, token, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', backendURL + 'update_username', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (token === null)
        token = ''
    xhr.send(JSON.stringify({ 'username': username, 'token': token }))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            callback(response.status, response.message)
        }
    }
}

const update_password = (email, curr_pass, new_pass, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', backendURL + 'update_password', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ 'new_pass': new_pass, 'curr_pass': curr_pass, 'email': email }))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            callback(response.status, response.message)
        }
    }
}

const reset_password = (email, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', backendURL + 'reset_password', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ 'email': email }))
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            callback(response)
        }
    }
}


export { getshortenedURL, sign_up, log_in, get_data, delete_url, update_username, update_password, reset_password };