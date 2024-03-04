const backendURL = 'https://short-fkjp.onrender.com';
const getshortenedURL = (url) => {
    console.log(url);

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Open a connection to the server
    xhr.open('POST', backendURL, true);

    // Set the request headers
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Send the request
    xhr.send(JSON.stringify({ 'url': url }));

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);

            let displayData = document.getElementById('display-short-url');
            displayData.innerHTML = backendURL + '/' + response.URL;

            return response;
        }
    }
};

export { getshortenedURL };