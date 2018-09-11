handlers.getWelcomePage = function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.loadPartials({
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/welcome.hbs');
    })
};

handlers.getLoginView = function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.loadPartials({
        loginForm: './templates/forms/login.hbs',
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/auth/loginView.hbs');
    })
};

handlers.getRegisterView = function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.loadPartials({
        registerForm: './templates/forms/register.hbs',
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/auth/registerView.hbs');
    })
};

handlers.loginUser = function (ctx) {
    const username = ctx.params.username;
    const password = ctx.params.password;

    if (username.length < 3 || !/^[a-zA-Z]+$/.test(username)) {
        notify.showError('A username should be at least 3 characters long and should contain only english alphabet letters.');
    } else if (password.length < 6 || !/^[a-zA-Z0-9]+$/.test(password)) {
        notify.showError('A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits.');
    } else {
        authService.login(username, password)
            .then((userData) => {
                authService.saveSession(userData);
                notify.showInfo('Login successful.');
                ctx.redirect('#/feed');
            })
            .catch(notify.handleError);
    }
};

handlers.registerUser = function (ctx) {
    const username = ctx.params.username;
    const password = ctx.params.password;
    const passwordCheck = ctx.params.repeatPass;
    const email = ctx.params.email;
    const avatarUrl = ctx.params.avatarUrl;

    if (username.length < 3 || !/^[a-zA-Z]+$/.test(username)) {
        notify.showError('A username should be at least 3 characters long and should contain only english alphabet letters.');
    } else if (password.length < 6 || !/^[a-zA-Z0-9]+$/.test(password)) {
        notify.showError('PA user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits.');
    } else if (password !== passwordCheck) {
        notify.showError('Both passwords must match!');
    } else {
        authService.register(username, password, email, avatarUrl)
            .then((userData) => {
                authService.saveSession(userData);
                notify.showInfo('User registration successful.');
                authService.login(username, password)
                notify.showInfo('User login successful.');
                ctx.redirect('#/feed');
            })
            .catch(notify.handleError)
    }
};

handlers.logout = function (ctx) {
    authService.logout()
        .then(() => {
            sessionStorage.clear();
            notify.showInfo('Logout successful.');
            ctx.redirect('#/welcome');
        })
};