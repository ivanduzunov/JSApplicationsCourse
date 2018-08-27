handlers.getHomePage = async function (ctx) {
    ctx.isAuthorized = auth.isAuth;
    ctx.username = sessionStorage.getItem('username');
    flightService.getAllActiveFlights()
        .then((data) => {
            ctx.flights = data;
            console.log(data);
            ctx.loadPartials({
                flight: './templates/flights/flight.hbs',
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/flights/homeView.hbs');
            })
        });
};