const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getWelcomePage);
        this.get('#/home', handlers.getWelcomePage);

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            if (username.length < 3 || /^[a-zA-Z]+$/.test(username) !== true) {
                auth.showError('Username should be with minimum 3 chars and containing only English letters.');
            }

            if (password !== repeatPass) {
                auth.showError('Passwords have to match!');
            }

            if (password.length < 6 || /^[a-zA-Z0-9]+$/.test(username) !== true) {
                auth.showError('Password should be with minimum 6 chars and containing only English letters and digits.');
            } else {
                auth.register(username, password)
                    .then(() => {
                        auth.showInfo(`${username} registered successfully!`)
                        ctx.redirect('#/catalog');
                    });
            }
        });

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then((userData) => {
                    auth.saveSession(userData);
                    ctx.redirect('#/catalog');
                    auth.showInfo(`${userData.username} logged in successfully!`);
                }).catch(() => {
                auth.showError(`Logged in failed.`);
            });
        });

    });
    app.run();
});