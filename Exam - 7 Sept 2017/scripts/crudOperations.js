const APP_KEY = 'kid_Hy5w1UYif'
const APP_SECRET = '4a232ab6270b404f857f8bd27f0a9d86'
const BASE_URL = 'https://baas.kinvey.com/'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}

const USER_REGISTER_URL = BASE_URL + `user/${APP_KEY}/`
//const USER_LOGIN_URL = USER_REGISTER_URL + 'login'
//const USER_LOGOUT_URL = USER_REGISTER_URL + '_logout'
//const ADS_BASE_URL = BASE_URL + `appdata/${APP_KEY}/ads/`

function registerUser() {
    let form = $('#formRegister')
    let username = form.find('input[name=username]').val()
    let password = form.find('input[name=password]').val()
    let repeatPassword = form.find('input[name=repeatPass]').val()


    if (username === '' || password === '' || repeatPassword === '') {
        console.log('error')
        showError('You cannot have missing fields.')
        form[0].reset()
        showRegisterView()
    }
    else if (username.toString().length < 5) {
        console.log('error')
        showError('The Username should be at least 5 characters long.')
        form[0].reset()
        showRegisterView()
    }
    else if (password !== repeatPassword) {
        console.log('error')
        showError('The password must match.')
        form[0].reset()
        showRegisterView()
    } else {

        let body = {username: username, password: password, subscriptions: []}

        $.ajax({
            method: 'POST',
            url: USER_REGISTER_URL,
            headers: AUTH_HEADERS,
            contentType: 'application/json',
            data: JSON.stringify(body),
        }).then(res => {
                console.log('successAJAX')
                signInUser(res, 'User registration successful.')

            }
        ).catch(errorMethod)

        function errorMethod() {
            console.log('ERROR AJAX')
        }

    }
}

function signInUser(res, message) {
    console.log('signing')
    sessionStorage.setItem('username', res.username)
    sessionStorage.setItem('authToken', res._kmd.authtoken)
    sessionStorage.setItem('userId', res._id)
    showHideMenuLinks()
    showInfo(message)
    showHomeView()
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    showError(errorMsg);
    console.log('error')
    showRegisterView()
}
