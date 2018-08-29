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
        this.get('#/logout', handlers.logoutUser);
        this.get('#/home', handlers.getHomePage);
        this.get('#/create', handlers.getCreateListingPage);
        this.post('#/create', handlers.createListing);
        this.get('#/details/:_id', handlers.getListingDetailsPage);
        this.get('#/edit/:_id', handlers.getEditListingPage);
        this.post('#/edit', handlers.editListing);
        this.get('#/my', handlers.getMyListingsPage);
        this.get('#/delete/:_id', handlers.deleteListing);
    });
    app.run();
});