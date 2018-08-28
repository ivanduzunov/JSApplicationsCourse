let flightService = (() => {
    function getAllActiveFlights() {
        const endpoint = `flights?query={"public":"true"}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function saveFlight(destination, origin, departureDate,
                        departureTime, seats, cost, image, isPublic) {
        let data = {
            "destination": destination,
            "origin": origin,
            "departureDate": departureDate,
            "departureTime": departureTime,
            "seats": seats,
            "cost": cost,
            "image": image,
            "public": isPublic === "on" ? true : false
        };

        return remote.post('appdata', 'flights', 'kinvey', data);
    }

    function getFlightById(id) {
        const endpoint = `flights/${id}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function editFlight(destination, origin, departureDate,
                        departureTime, seats, cost, image, isPublic, _id) {
        const endpoint = `flights/${_id}`;
        let data = {
            "_id": _id,
            "destination": destination,
            "origin": origin,
            "departureDate": departureDate,
            "departureTime": departureTime,
            "seats": seats,
            "cost": cost,
            "image": image,
            "public": isPublic === "on" ? true : false
        };

        console.log('We are in editFlight')
        console.log(data)

        return remote.update('appdata', endpoint, 'kinvey', data);
    }


    return {
        getAllActiveFlights,
        saveFlight,
        getFlightById,
        editFlight
    }
})();