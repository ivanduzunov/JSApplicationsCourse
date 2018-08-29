const handlers = {};

$(() => {
    // Define routes here using Sammy.js
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getWelcomePage); //welcomePage will be shown at first
        this.get('#/welcome', handlers.getWelcomePage); //welcomePage will be shown at when you hit Home
        this.get('#/login', handlers.getLoginView); //loginView get
        this.post('#/login', handlers.loginUser);
        this.get('#/register', handlers.getRegisterView); //registerView get
        this.post('#/register', handlers.registerUser);
        this.get('#/logout', handlers.logoutUser);

        this.get('#/home', handlers.getHomePage); //homePage with listing of cars

        this.get('#/create', handlers.getCreateListingPage);
        this.post('#/create', handlers.createListing);
        this.get('#/details/:_id', handlers.getListingDetailsPage);
        this.get('#/edit/:_id', handlers.getEditListingPage);
        this.post('#/edit', handlers.editListing);

        /*

        this.get('#/login', handlers.getLoginPage);// loginPage

        this.get('#/register', handlers.getRegisterPage);//registerPage


        this.get('#/home', handlers.getHomePage);//homePage with listing of active flights
        this.get('#/flights/add', handlers.getFlightAddPage);//get flights add page
        this.post('#/flights/add', handlers.AddFlight);//post addFlight

        this.get('#/flights/:id', handlers.getFlightDetailsPage);//get flights add page

        this.get('#/flights/edit/:id', handlers.getFlightEditPage);//get flights edit page
        this.post('#/flights/edit', handlers.editFlight);//post flights edit*/
    });
    app.run();
});