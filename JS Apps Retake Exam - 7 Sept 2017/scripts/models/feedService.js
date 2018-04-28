let feedService = (() => {
    function getAllChirpsSortedByPostTimeDesc() {
        let username = sessionStorage.getItem('username');
        return requester.get('appdata', `chirps?query={"author":{"$in": ["vako"]}}&sort={"_kmd.ect": 1}`, 'kinvey')
    }

    return {
        getAllChirpsSortedByPostTimeDesc
    }
})();