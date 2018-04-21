$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', (ctx) => {
            //Todo: show the username, when the user is loggedIn
            let isLogged = sessionStorage.getItem('authtoken') !== null;
            ctx.loggedIn = isLogged;
            if (isLogged) {
                ctx.username = sessionStorage.getItem('username');
            }
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/home/home.hbs');
                });
        });

        this.get('#/register', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPassword;

            if (password !== repeatPass) {
                alert('Passwords have to match!');
            } else {
                auth.register(username, password);
                ctx.redirect('#/index.html');
            }
        });

        this.get('#/login', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then((userData) => {
                    auth.saveSession(userData);
                    ctx.redirect('#/index.html');
                }).catch(console.error);
        });

        this.get('#/catalog', (ctx) => {
            teamsService.loadTeams().then((userData) => {
                ctx.teams = userData;
                console.log(ctx.teams)
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    team: './templates/catalog/team.hbs'

                }).then(function () {
                    this.partial('./templates/catalog/teamCatalog.hbs');
                });
            });
        });

    });

    app.run();
});