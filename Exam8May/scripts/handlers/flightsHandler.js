handlers.getHomePage = function (ctx) {
    ctx.isAuthorized = auth.isAuth;
    ctx.username = sessionStorage.getItem('username');
    ctx.flights = flightService.getAllActiveFlights;
    ctx.loadPartials({
        flight: './templates/flights/flightListingView.hbs',
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/flights/catalogView.hbs');
    })

};