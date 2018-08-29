handlers.getHomePage = async function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.username = sessionStorage.getItem('username');
    carService.getAllListings()
        .then((data) => {
            ctx.cars = data;
            ctx.noCars = data.length === 0;
            console.log(data);
            ctx.loadPartials({
                carListing: './templates/car/carListing.hbs',
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/car/carListingsView.hbs');
            })
        });
};

handlers.getCreateListingPage = async function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        createListingForm: './templates/forms/createListing.hbs',
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/car/createListingView.hbs');
    })
};

handlers.createListing = function (ctx) {
    const title = ctx.params.title;
    const description = ctx.params.description;
    const brand = ctx.params.brand;
    const model = ctx.params.model;
    const year = ctx.params.year;
    const imageUrl = ctx.params.imageUrl;
    const fuelType = ctx.params.fuelType;
    const price = ctx.params.price;
    const seller = sessionStorage.getItem('username');

    if (title.length < 1 || title.length > 33) {
        notify.showError('Invalid title!');
    } else if (description.length < 6 || description.length > 100) {
        notify.showError('Invalid description!');
    } else if (brand.length === 0 || fuelType.length === 0 || model.length === 0) {
        notify.showError('Invalid brand, model or fuel type!');
    } else {
        carService.createListing
        (title, description, brand, model,
            year, imageUrl, fuelType, price, seller)
            .then(() => {
                notify.showInfo('Listing created successful.');
                ctx.redirect('#/home');
            })
            .catch(notify.handleError)
    }
};

handlers.getListingDetailsPage = function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.username = sessionStorage.getItem('username');

    carService.getListingById(ctx.params._id)
        .then((data) => {
            ctx.title = data.title;
            ctx.imageUrl = data.imageUrl;
            ctx.brand = data.brand;
            ctx.model = data.model;
            ctx.year = data.year;
            ctx.fuel = data.fuel;
            ctx.description = data.description;
            ctx.price = data.price;
            ctx._id = data._id;

            ctx.loadPartials({
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/car/listingDetailsView.hbs');
            })
        });
}

handlers.getEditListingPage = function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.username = sessionStorage.getItem('username');

    carService.getListingById(ctx.params._id)
        .then((data) => {
            let listing = {
                seller: data.seller,
                title: data.title,
                imageUrl: data.imageUrl,
                brand: data.brand,
                model: data.model,
                year: data.year,
                fuel: data.fuel,
                description: data.description,
                price: data.price,
                _id: data._id
            };

            ctx.car = listing;

            if(listing.seller !== sessionStorage.getItem('username')){
                notify.showInfo('You are not allowed to edit this listing.');
                ctx.redirect(`#/home`);
            }

            ctx.loadPartials({
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs',
                editListingForm: './templates/forms/editListing.hbs'
            }).then(function () {
                this.partial('./templates/car/editListingView.hbs');
            })
        });
}

handlers.editListing = function (ctx) {
    const title = ctx.params.title;
    const description = ctx.params.description;
    const brand = ctx.params.brand;
    const model = ctx.params.model;
    const year = ctx.params.year;
    const imageUrl = ctx.params.imageUrl;
    const fuelType = ctx.params.fuelType;
    const price = ctx.params.price;
    const _id = ctx.params._id;
    const seller = sessionStorage.getItem('username');

    if (title.length < 1 || title.length > 33) {
        notify.showError('Invalid title!');
    } else if (description.length < 6 || description.length > 100) {
        notify.showError('Invalid description!');
    } else if (brand.length === 0 || fuelType.length === 0 || model.length === 0) {
        notify.showError('Invalid brand, model or fuel type!');
    } else {
        carService.editListing
        (title, description, brand, model,
            year, imageUrl, fuelType, price, seller, _id)
            .then(() => {
                notify.showInfo('Listing edited successful.');
                ctx.redirect(`#/details/${_id}`);
            })
            .catch(notify.handleError)
    }
};

handlers.getMyListingsPage = async function (ctx) {
    let username = sessionStorage.getItem('username');
    ctx.isAuth = authService.isAuth;
    ctx.username = username;
    carService.getMyListings(username)
        .then((data) => {
            ctx.cars = data;
            ctx.noCars = data.length === 0;
            ctx.loadPartials({
                myListing: './templates/car/myListing.hbs',
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/car/myListingsView.hbs');
            })
        });
};

handlers.deleteListing = async function (ctx) {
    let username = sessionStorage.getItem('username');
    ctx.isAuth = authService.isAuth;
    ctx.username = username;
    let _id = ctx.params._id;

    let conf = confirm("Are you sure?");
    if (conf) {
        carService.deleteListing(_id)
            .then(() => {
                ctx.redirect('#/home');
            });
    } else {

    }

};

