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

handlers.getFlightAddPage = function (ctx) {
    ctx.isAuthorized = auth.isAuth;
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        addFlightForm: './templates/forms/addFlightForm.hbs',
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/flights/addFlightView.hbs');
    })
};

handlers.AddFlight = function (ctx) {
    const destination = ctx.params.destination;
    const origin = ctx.params.origin;
    const departureDate = ctx.params.departureDate;
    const departureTime = ctx.params.departureTime;
    const seats = ctx.params.seats;
    const cost = ctx.params.cost;
    const image = ctx.params.image;
    const isPublic = ctx.params.public;

    if (destination.length === 0 || origin.length === 0 ||
        departureDate === 0 || departureTime === 0) {
        notify.showError('Invalid input!');
    } else {
        flightService.saveFlight
        (destination, origin, departureDate,
            departureTime, seats, cost, image, isPublic)
            .then(() => {
                notify.showInfo('Flight added successfully.');
                ctx.redirect('#/home');
            }).catch(notify.handleError);
    }
};

handlers.getFlightDetailsPage = function (ctx) {
    ctx.isAuthorized = auth.isAuth;
    ctx.username = sessionStorage.getItem('username');
    flightService.getFlightById(ctx.params.id)
        .then((data) => {
            ctx.destination = data.destination;
            ctx.image = data.image;
            ctx.departureDate = data.departureDate;
            ctx.departureTime = data.departureTime;
            ctx.origin = data.origin;
            ctx.seats = data.seats;
            ctx.cost = data.cost;
            ctx._id = data._id;

            ctx.loadPartials({
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/flights/flightDetailsView.hbs');
            })
        });
}

handlers.getFlightEditPage = function (ctx) {
    ctx.isAuthorized = auth.isAuth;
    ctx.username = sessionStorage.getItem('username');
    ctx._id = ctx.params.id;
    flightService.getFlightById(ctx.params.id)
        .then((data) => {
            let currentValues = {
                destination: data.destination,
                image: data.image,
                departureDate: data.departureDate,
                departureTime: data.departureTime,
                origin: data.origin,
                seats: data.seats,
                cost: data.cost,
                _id: ctx.params.id
            }

            ctx.flight = currentValues;
            ctx.loadPartials({
                editFlightForm: './templates/forms/editFlightForm.hbs',
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/flights/editFlightView.hbs');
            })
        });
}

handlers.editFlight = function (ctx) {

    const destination = ctx.params.destination;
    const origin = ctx.params.origin;
    const departureDate = ctx.params.departureDate;
    const departureTime = ctx.params.departureTime;
    const seats = ctx.params.seats;
    const cost = ctx.params.cost;
    const image = ctx.params.image;
    const isPublic = ctx.params.public;
    const _id = ctx.params._id;
    console.log(ctx)
    console.log('We are in handlers.EditFlight')

    if (destination.length === 0 || origin.length === 0 ||
        departureDate === 0 || departureTime === 0) {
        notify.showError('Invalid input!');
    } else {
        flightService.editFlight
        (destination, origin, departureDate,
            departureTime, seats, cost, image, isPublic, _id)
            .then(() => {
                notify.showInfo('Flight edited successfully.');
                ctx.redirect('#/home');
            }).catch(notify.handleError);
    }
};
