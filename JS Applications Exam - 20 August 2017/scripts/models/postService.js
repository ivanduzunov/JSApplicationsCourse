let postsService = (() => {

    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

    function getAllPostsSortedByPostTimeDescending() {
        return requester.get('appdata', 'posts?query={}&sort={"_kmd.ect": -1}', 'kinvey');
    }

    function createPost(url, title, imageUrl, description) {
        let author = sessionStorage.getItem('username');
        let data = {
            author,
            description,
            imageUrl,
            title,
            url
        };
        return requester.post('appdata', 'posts', 'kinvey', data)
    }

    function getPostById(id) {
        return requester.get('appdata', 'posts/' + id, 'kinvey')
    }

    function editPost(url, title, imageUrl, description, id) {
        let data = {
            url,
            title,
            imageUrl,
            description
        };

        return requester.update('appdata', 'posts/' + id, 'kinvey', data);
    }

    function getCommentsByPostId(id) {
        return requester.get('appdata', `comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`, 'kinvey')
    }

    function createComment(postId, content, author) {
        let data = {
            postId,
            content,
            author
        };

        return requester.post('appdata', 'comments', 'kinvey', data)
    }

    function deletePost(id) {
        return requester.remove('appdata', 'posts/' + id, 'kinvey')
    }

    return {
        calcTime,
        getAllPostsSortedByPostTimeDescending,
        createPost,
        getPostById,
        editPost,
        getCommentsByPostId,
        createComment,
        deletePost
    }


})();