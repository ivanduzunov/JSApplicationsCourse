$(() => {
    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show()
        },
        ajaxStop: function () {
            $('#loadingBox').hide()
        }
    });

    const app = Sammy(('#main', function () {
            this.use('Handlebars', 'hbs');

            this.get('#/index.html', (ctx) => {
                let isLoggedIn = sessionStorage.getItem('authtoken') !== null;
                if (!isLoggedIn) {
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        loginForm: './templates/login/loginForm.hbs'
                    }).then(function () {
                        this.partial('./templates/login/loginView.hbs');
                    });
                } else {

                }
            });

            this.post('#/index.html', (ctx) => {
                let username = ctx.params.username;
                let password = ctx.params.password;

                if (username === '' || password === '') {
                    auth.showError('The fields cannot be empty')
                } else {
                    auth.login(username, password)
                        .then((userData) => {
                            auth.saveSession(userData);
                            ctx.redirect('#/feed');
                            auth.showInfo(`${userData.username} logged in successfully!`);
                        }).catch(() => {
                        auth.showError(`Logged in failed.`);
                    });
                }
            });

            this.get('#/register', (ctx) => {
                let isLoggedIn = sessionStorage.getItem('authtoken') !== null;
                if (!isLoggedIn) {
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        registerForm: './templates/register/registerForm.hbs'
                    }).then(function () {
                        this.partial('./templates/register/registerView.hbs');
                    });
                } else {

                }
            });

            this.post('#/register', (ctx) => {
                let username = ctx.params.username;
                let password = ctx.params.password;
                let repeatPass = ctx.params.repeatPass;

                if (username.length < 5) {
                    auth.showError('Username should be with minimum 3 chars and containing only English letters.');
                }

                if (password.length < 1) {
                    auth.showError('Password cannot be empty');
                }

                if (password !== repeatPass) {
                    auth.showError('Password should match.');
                } else {
                    auth.register(username, password)
                        .then(() => {
                            auth.showInfo(`${username} registered successfully!`)
                            ctx.redirect('#/index.html');
                        });
                }
            });

            this.get('#/feed', (ctx) => {
                let isLoggedIn = sessionStorage.getItem('authtoken') !== null;
                if (isLoggedIn) {
                    let followSomebody = sessionStorage.getItem('subscriptions') !== null;
                    feedService.getAllChirpsSortedByPostTimeDesc()
                        .then((data) => {
                            ctx.chirps = data;
                            ctx.loadPartials({
                                header: './templates/common/header.hbs',
                                footer: './templates/common/footer.hbs',
                                menu: './templates/common/menu.hbs',
                                chirperForm: './templates/feed/chirperForm.hbs',
                                chirpListView: './templates/feed/chirpListView.hbs',
                                userStats: './templates/feed/userStats.hbs',
                                chirpsList: './templates/feed/chirpsList.hbs'
                            }).then(function () {
                                this.partial('./templates/feed/feedView.hbs');
                            });
                        });
                }

            });


        }))
    ;
    app.run();
})
;