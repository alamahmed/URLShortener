// const backendURL = 'https://short-fkjp.onrender.com/';
const backendURL = 'http://127.0.0.1:8000/';

const getshortenedURL = (url, setLoading) => {

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest()

    // Open a connection to the server
    xhr.open('POST', backendURL, true)

    // Set the request headers
    xhr.setRequestHeader('Content-Type', 'application/json')

    // Send the request
    xhr.send(JSON.stringify({ 'url': url }))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)

            let displayData = document.getElementById('display_short_url')
            displayData.innerHTML = backendURL + response.URL
            setLoading(false)
            return response
        }
    }
};

const sign_up = (fullName, email, password, callback) => {

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest()

    // Open a connection to the server
    xhr.open('POST', backendURL + 'signup', true)

    // Set the request headers
    xhr.setRequestHeader('Content-Type', 'application/json')

    // Send the request
    let User = { fullName: fullName, email: email, password: password }
    xhr.send(JSON.stringify(User))

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText)
            callback(response)
            return response
        }
    }
};

const log_in = (email, password) => {

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Open a connection to the server
    xhr.open('GET', backendURL + '/login', true);

    // Set the request headers
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Send the request
    xhr.send(JSON.stringify({ 'email': email, 'password': password }));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            return response;
        }
    }
};

export { getshortenedURL, sign_up, log_in };