let carService = (() => {
    function getAllListings() {
        const endpoint = `cars`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function getMyListings(username) {
        const endpoint = `cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`;
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

    function deleteListing
    (id) {
        return remote.remove('appdata', `cars/${id}`,'kinvey');
    }

    function getListingById(_id) {
        const endpoint = `cars/${_id}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function editListing
    (title, description, brand, model,
     year, imageUrl, fuelType, price, seller, _id) {
        let endpoint = `cars/${_id}`
        let obj = {
            _id: _id,
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

        return remote.update('appdata', endpoint, 'kinvey', obj);
    }


    return {
        getAllListings,
        createListing,
        getListingById,
        editListing,
        getMyListings,
        deleteListing
    }
})();