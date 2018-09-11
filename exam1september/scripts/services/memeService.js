let memeService = (() => {
    function getAllMemes() {
        const endpoint = `memes?query={}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function createMeme
    (title, description, imageUrl, creator) {
        let obj = {
            title: title,
            description: description,
            imageUrl: imageUrl,
            creator: creator
        };

        return remote.post('appdata', 'memes', 'kinvey', obj);
    }

    function getMemeById(_id) {
        const endpoint = `memes/${_id}`;
        return remote.get('appdata', endpoint, 'kinvey');
    }

    function editMeme
    (title, description, imageUrl, creator, _id) {
        let endpoint = `memes/${_id}`
        let obj = {
            _id: _id,
            title: title,
            description: description,
            imageUrl: imageUrl,
            creator: creator
        };

        return remote.update('appdata', endpoint, 'kinvey', obj);
    }

    function deleteMeme
    (_id) {
        return remote.remove('appdata', `memes/${_id}`,'kinvey');
    }

    return {
        getAllMemes,
        createMeme,
        getMemeById,
        editMeme,
        deleteMeme
    }
})();