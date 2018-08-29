let carService = (() => {

    function getAllListings() {
        const endpoint = `cars`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function createListing
    (title, description, brand, model,
     year, imageUrl, fuelType, price, seller) {
        let obj = {
            title: title,
            description: description,
            brand: brand,
            model: model,
            year: year,
            imageUrl: imageUrl,
            fuel: fuelType,
            price: price,
            seller: seller
        };

        return remote.post('appdata', 'cars', 'kinvey', obj);
    }

    function getListingById(_id) {
        const endpoint = `cars/${_id}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }


    return {
        getAllListings,
        createListing,
        getListingById
    }
})();