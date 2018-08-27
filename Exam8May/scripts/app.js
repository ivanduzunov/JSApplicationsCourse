const handlers = {};

$(() => {
    // Define routes here using Sammy.js
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getLoginPage); //loginPage will be shown at first

        this.get('#/login', handlers.getLoginPage);// loginPage
        this.post('#/login', handlers.loginUser);
        this.get('#/register', handlers.getRegisterPage);//registerPage
        this.post('#/register', handlers.registerUser);

        this.get('#/home', handlers.getHomePage);//homePage with listing of active flights


        /* 
          this.get('#/logout', handlers.logout);

          this.get('#/editor', handlers.getEditor);
          this.post('#/entry/create', handlers.createEntry);
          this.post('#/entry/delete', handlers.deleteEntry);
          this.post('#/checkout', handlers.checkout);

          this.get('#/overview', handlers.getMyReceipts);
          this.get('#/receipt/details/:id', handlers.getReceiptDetails);*/
    });
    app.run();
});