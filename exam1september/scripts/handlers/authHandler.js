/* handlers.getWelcomePage = function (ctx) {
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
        notify.showError('Username must be at least 3 chars long and contains only English alphabet letters!');
    } else if (password.length < 6 || !/^[a-zA-Z0-9]+$/.test(password)) {
        notify.showError('Password must be at least 6 chars long and contains only English alphabet letters and digits!');
    } else {
        authService.login(username, password)
            .then((userData) => {
                authService.saveSession(userData);
                notify.showInfo('Login successful.');
                ctx.redirect('#/home');
            })
            .catch(notify.handleError);
    }
};

handlers.registerUser = function (ctx) {
    const username = ctx.params.username;
    const password = ctx.params.password;
    const passwordCheck = ctx.params.repeatPass;

    if (username.length < 3 || !/^[a-zA-Z]+$/.test(username)) {
        notify.showError('Username must be at least 3 chars long and contains only English alphabet letters!');
    } else if (password.length < 6 || !/^[a-zA-Z0-9]+$/.test(password)) {
        notify.showError('Password must be at least 6 chars long and contains only English alphabet letters and digits!');
    } else if (password !== passwordCheck) {
        notify.showError('Both passwords must match!');
    } else {
        authService.register(username, password)
            .then((userData) => {
                authService.saveSession(userData);
                notify.showInfo('User registration successful.');
                ctx.redirect('#/login');
            })
            .catch(notify.handleError)
    }
};

handlers.logoutUser = function (ctx) {
    authService.logout()
        .then(() => {
            sessionStorage.clear();
            notify.showInfo('Logout successful.');
            ctx.redirect('#/welcome');
        })
};*/