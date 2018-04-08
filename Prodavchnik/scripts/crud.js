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
    }

    function registerError(data) {
        console.log(data)
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

    function loginSuccess(data) {
        console.log(data)
        sessionStorage.setItem('username', data.username)
        sessionStorage.setItem('id', data._id)
        sessionStorage.setItem('authtoken', data._kmd.authtoken)
    }

    function loginError(data) {
        console.log(data.description)
    }
}