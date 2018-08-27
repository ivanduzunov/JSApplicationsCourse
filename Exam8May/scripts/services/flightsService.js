let flightService = (() => {
    function getAllActiveFlights() {
        const endpoint = `flights?query={"public":true}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {
        getAllActiveFlights
    }
})();