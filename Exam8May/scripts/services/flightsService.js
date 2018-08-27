let flightService = (() => {
    function getAllActiveFlights() {
        console.log('IN THE SERVICE');
        const endpoint = `flights?query={"public":""}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {
        getAllActiveFlights
    }
})();