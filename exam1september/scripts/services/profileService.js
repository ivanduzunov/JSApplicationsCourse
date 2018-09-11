let profileService = (() => {

    function getUserProfile(_id) {
        const endpoint = `${_id}`;
        return remote.get('user', endpoint, 'kinvey');
    }

    function getMemesByUsername(username) {
        const endpoint = `memes?query={"creator":"${username}"}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }


    return {
        getUserProfile,
        getMemesByUsername
    }
})();