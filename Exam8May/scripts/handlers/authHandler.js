handlers.getLoginPage = function (ctx) {
    ctx.isAuthorized = auth.isAuth;

    ctx.loadPartials({
        loginForm: './templates/forms/loginForm.hbs',
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/user/loginView.hbs');
    })
};

handlers.getRegisterPage = function (ctx) {
    ctx.isAuthorized = auth.isAuth;

    ctx.loadPartials({
        registerForm: './templates/forms/registerForm.hbs',
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/user/registerView.hbs');
    })
};

handlers.loginUser = function (ctx) {
    const username = ctx.params.username;
    const password = ctx.params.password;

    if (username.length === 0) {
        notify.showError('Username is requried!');
    } else if (password.length === 0) {
        notify.showError('Password is requried!');
    } else {
        auth.login(username, password)
            .then((userData) => {
                auth.saveSession(userData);
                notify.showInfo('Login successful.');
                ctx.redirect('#/home');
            })
            .catch(notify.handleError);
    }
};

handlers.registerUser = function (ctx) {
    const username = ctx.params.username;
    const password = ctx.params.password;
    const passwordCheck = ctx.params.passwordCheck;

    if(username.length < 5){
        notify.showError('Username must be at least 5 chars long!');
    } else if (password.length === 0) {
        notify.showError('Password must be non-empty!');
    } else if (password !== passwordCheck) {
        notify.showError('Both passwords must match!');
    } else {
        auth.register(username, password)
            .then((userData) => {
                auth.saveSession(userData);
                notify.showInfo('User registration successful.');
                ctx.redirect('#/home');
            })
            .catch(notify.handleError)
    }
};

/*

handlers.logout = function (ctx) {
    auth.logout()
        .then(() => {
            sessionStorage.clear();
            notify.showInfo('Logout successful.');
            ctx.redirect('#/home');
        })
};*/
