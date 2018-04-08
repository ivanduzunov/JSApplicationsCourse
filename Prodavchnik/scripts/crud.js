const appKey = 'kid_BJ5daMNjz'
const appSecret = '6cc94637ad47403b94c9d70617e21e81'
const baseUrl = 'https://baas.kinvey.com'
const authHeaders =
    {Authorization: 'Basic ' + btoa(appKey + ':' + appSecret)}


function registerUser() {
    let registerForm = $("#formRegister")
    let username = registerForm.find('input[name=username]').val()
    let password = registerForm.find('input[name=password]').val()
    console.log(username)
    console.log(password)
    let registerData = {username, password}

    console.log(registerData)

    $.ajax({
        method: 'POST',
        url: baseUrl + '/user/' + appKey,
        data: registerData,
        headers: authHeaders,
        success: registerSuccess,
        error: registerError
    })

    function registerSuccess(data) {
        console.log(data)
        registerForm.find('input[name=username]').val('')
        registerForm.find('input[name=password]').val('')
        showInfo("Register successfull.")
    }

    function registerError(data) {
        console.log(data)
        showError("Register failed")
    }
}

function loginUser() {
    let loginForm = $("#formLogin")
    let username = loginForm.find('input[name=username]').val()
    let password = loginForm.find('input[name=password]').val()
    let loginData = {username, password}

    console.log(loginData)

    $.ajax({
        method: 'POST',
        url: baseUrl + '/user/' + appKey + '/login',
        data: loginData,
        headers: authHeaders,
        success: loginSuccess,
        error: loginError
    })

    function loginSuccess(data, message) {
        console.log(data)
        sessionStorage.setItem('username', data.username)
        sessionStorage.setItem('id', data._id)
        sessionStorage.setItem('authtoken', data._kmd.authtoken)
        loginForm.find('input[name=username]').val('')
        loginForm.find('input[name=password]').val('')
        showHiddenMenuLinks()
        showHomeView()
        showInfo("login successfull.")
    }

    function loginError(data) {
        showError("Login failed")
    }
}

function logoutUser() {
    sessionStorage.clear()
    showHiddenMenuLinks()
    showHomeView()
    showInfo('Logout success!')
}

function getAuthToken() {
    return {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')};
}

function createAdd() {
    let createAddForm = $("#formCreateAd")
    let title = createAddForm.find('input[name=title]').val()
    let description = createAddForm.find('textarea[name=description]').val()
    let dateOfPublishing = createAddForm.find('input[name=datePublished]').val()
    let price = createAddForm.find('input[name=price]').val()
    let publisher = sessionStorage.getItem('username')

    let addData = {title, description, dateOfPublishing, price, publisher}
    console.log(addData)
    request('POST', baseUrl + `/appdata/${appKey}/adverts/`, "Kinvey " + sessionStorage.getItem('authtoken'), addData)
        .then(res => {
            console.log(data)
            createAddForm.find('input[name=title]').val('')
            createAddForm.find('textarea[name=description]').val('')
            createAddForm.find('input[name=datePublished]').val('')
            createAddForm.find('input[name=price]').val('')
            showInfo("Publishing add successfull.")
            showHomeView()
        })
        .catch(addAddError);

    function addAddError(data) {
        console.log(data)
        showError('Publishing add failed.')
    }
}

function request(method, endpoint, auth, body) {
    // Construct request, using the passed in parameters and return promise
    return $.ajax({
        method: method,
        url: endpoint,
        headers: auth,
        contentType: 'application/json',
        data: JSON.stringify(body)
    });
}
