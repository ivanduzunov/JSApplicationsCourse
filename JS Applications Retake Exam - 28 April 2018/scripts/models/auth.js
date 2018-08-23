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
            username: username,
            password: password,
            subscriptions: []
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

    function handleError(reason) {
        showError(reason.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.find('span').text(message);
        infoBox.fadeIn();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.find('span').text(message);
        errorBox.fadeIn();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });



    return {
        login,
        register,
        logout,
        saveSession,
        handleError,
        showError,
        showInfo
    }
})();