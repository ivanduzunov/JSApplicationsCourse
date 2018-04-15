const APP_KEY = 'kid_Hy5w1UYif';
const APP_SECRET = '4a232ab6270b404f857f8bd27f0a9d86';
const BASE_URL = 'https://baas.kinvey.com/';
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};

const USER_REGISTER_URL = BASE_URL + `user/${APP_KEY}/`;
const USER_LOGIN_URL = USER_REGISTER_URL + 'login';
const USER_LOGOUT_URL = USER_REGISTER_URL + '_logout';
const ADS_BASE_URL = BASE_URL + `appdata/${APP_KEY}/ads/`;

// Local container for all ads in order to skip requesting all of them after each Edit/Delete
let adsContainer = [];

function getAuthToken() {
    return {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')};
}

function registerUser() {
    let regForm = $('#formRegister');

    let username = regForm.find('input[name=username]').val();
    let password = regForm.find('input[name=password]').val();
    let confPassword = regForm.find('input[name=repeatPass]').val();

    let body = {username: username, password: password, confPassword: confPassword, subscriptions: []};

    if (!validateInput(body)) return;

    delete body.confPassword

    request('POST', USER_REGISTER_URL, AUTH_HEADERS, body)
        .then(res => {
            signInUser(res, 'Registration successful.');
        })
        .catch(handleAjaxError);
}

function loginUser() {
    let loginForm = $('#formLogin');

    let username = loginForm.find('input[name=username]').val();
    let password = loginForm.find('input[name=passwd]').val();
    let body = {username: username, password: password};

    request('POST', USER_LOGIN_URL, AUTH_HEADERS, body)
        .then(res => {
            signInUser(res, 'Login successful.');
        }).catch(handleAjaxError);
}

function signInUser(res, message) {
    // Save username, authToken and userId into sessionStorage
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authToken', res._kmd.authtoken);
    sessionStorage.setItem('userId', res._id);

    showHideMenuLinks();
    showHomeView();
    showInfo(message);
}

function logoutUser() {
    request('POST', USER_LOGOUT_URL, getAuthToken(), {})
        .then(logoutSuccess)
        .catch(handleAjaxError);
}

function logoutSuccess() {
    sessionStorage.clear();
    showHomeView();
    showHideMenuLinks();
    showInfo('Logout successful.');
}

function validateInput(data) {
    // Simulate server response object to pass it in the handleAjaxError function
    // in case there is an issue with the inputs from the user
    let errorResponse = {
        readyState: 1,
        responseJSON: {
            description: ''
        },
    };

    if (data.hasOwnProperty('username')) {
        if (data.username === '') {
            errorResponse.responseJSON['description'] = 'Please fill out Username field.';
            handleAjaxError(errorResponse);
            return false;
        }

        if (data.password === '') {
            errorResponse.responseJSON['description'] = 'Please fill out Password field.';
            handleAjaxError(errorResponse);
            return false;
        }

        if (data.confPassword === '') {
            errorResponse.responseJSON['description'] = 'Please fill out Confirm Password field.';
            handleAjaxError(errorResponse);
            return false;
        }

        if (data.password !== data.confPassword) {
            errorResponse.responseJSON['description'] = 'Password have to match.';
            handleAjaxError(errorResponse);
            return false;
        }

        return true;
    }

    if (data.title === '') {
        errorResponse.responseJSON['description'] = 'Please fill out Title field.';
        handleAjaxError(errorResponse);
        return false;
    }

    if (data.publisher === '') {
        errorResponse.responseJSON['description'] = 'Please fill out Publisher field.';
        handleAjaxError(errorResponse);
        return false;
    }

    if (data.description === '') {
        errorResponse.responseJSON['description'] = 'Please fill out Description field.';
        handleAjaxError(errorResponse);
        return false;
    }

    if (data.date === '') {
        errorResponse.responseJSON['description'] = 'Please fill out Date field.';
        handleAjaxError(errorResponse);
        return false;
    }

    if (isNaN(data.price)) {
        errorResponse.responseJSON['description'] = 'Please fill out Price field with a valid number.';
        handleAjaxError(errorResponse);
        return false;
    }

    if (data.image === '') {
        errorResponse.responseJSON['description'] = 'Please fill out Image field.';
        handleAjaxError(errorResponse);
        return false;
    }

    return true;
}

function handleAjaxError(response) {
    // Handle error an display the error message
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showError(errorMsg);
}