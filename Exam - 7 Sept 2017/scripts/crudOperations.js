const APP_KEY = 'kid_Hy5w1UYif'
const APP_SECRET = '4a232ab6270b404f857f8bd27f0a9d86'
const BASE_URL = 'https://baas.kinvey.com/'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}

const USER_REGISTER_URL = BASE_URL + `user/${APP_KEY}/`
//const USER_LOGIN_URL = USER_REGISTER_URL + 'login'
//const USER_LOGOUT_URL = USER_REGISTER_URL + '_logout'
//const ADS_BASE_URL = BASE_URL + `appdata/${APP_KEY}/ads/`

function registerUser() {
    
}