function sendRequest(method, endpoint, auth, body) {
    return $.ajax({
        method: method,
        url: endpoint,
        headers: auth,
        contentType: 'application/json',
        data: JSON.stringify(body)
    });
}