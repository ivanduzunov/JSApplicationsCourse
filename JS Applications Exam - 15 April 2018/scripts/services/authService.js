let auth = (() => {
    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('teamId', userInfo.teamId);
    }

    function login(username, password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    function register(username, password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', '', 'basic', userData);
    }

    function logout() {
        //let logoutData = {
        // authtoken: sessionStorage.getItem('authtoken')
        //};

        //return requester.post('user', '_logout', 'kinvey', logoutData);
        sessionStorage.clear();
    }


    return {
        login,
        register,
        logout,
        saveSession
    }
})();