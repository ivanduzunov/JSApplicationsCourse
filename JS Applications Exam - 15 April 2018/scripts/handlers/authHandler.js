handlers.getWelcomePage = function (ctx) {
    ctx.loadPartials({
        loginForm: "./templates/forms/loginForm.hbs",
        registerForm: './templates/forms/registerForm.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/welcome.hbs');
    })
};