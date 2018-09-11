const handlers = {};
$(() => {
    // Define routes here using Sammy.js
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getWelcomePage);
        this.get('#/welcome', handlers.getWelcomePage);
        this.get('#/login', handlers.getLoginView);
        this.post('#/login', handlers.loginUser);
        this.get('#/register', handlers.getRegisterView);
        this.post('#/register', handlers.registerUser);
        this.get('#/logout', handlers.logout);


        this.get('#/feed', handlers.getFeedPage);
        this.get('#/create', handlers.getCreateMemePage);
        this.post('#/create', handlers.createMeme);
        this.get('#/details/:_id', handlers.getMemeDetailsPage);
        this.get('#/edit/:_id', handlers.getEditMemePage);
        this.post('#/edit', handlers.editMeme);
        this.get('#/delete/:_id', handlers.deleteMeme);
        this.get('#/profile/:_id', handlers.getUserProfilePage);
    });
    app.run();
});