function sendRequest(method, endpoint, auth, body, successMethod, errorMethod) {
    return $.ajax({
        method: method,
        url: endpoint,
        headers: auth,
        contentType: 'application/json',
        data: JSON.stringify(body),
        success: successMethod,
        error: errorMethod
    })
}