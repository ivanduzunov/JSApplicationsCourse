function attachEvents() {
    const loadBtn = $('#btnLoadPosts');
    const viewBtn = $('#btnViewPost');
    const posts = $('#posts');
    const postTitle = $('#post-title');
    const postBody = $('#post-body');
    const postComments = $('#post-comments');
    const appKey = `kid_H18E8Aj9f`;
    const username = 'ivan.d.uzunov@gmail.com';
    const password = 'levski1914';

    const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/`;
    const auth = {'Authorization': 'Basic ' + btoa(username + ':' + password)};

    loadBtn.on('click', loadPostsClick)
    viewBtn.on('click', viewPostDetails)

    function loadPostsClick() {
        $.ajax({
            method: 'GET',
            url: baseUrl + 'posts',
            headers: auth
        }).then(displayPosts)
            .catch(displayError)

        function displayPosts(res) {
            for (let obj of res) {
                posts.append(`<option value="${obj._id}">${obj.title}</option>`)
            }
        }

        function displayError(res) {

        }
    }

    function viewPostDetails() {
        let postId = posts.find(':selected').attr('value')

        $.ajax({
            method: 'GET',
            url: baseUrl + 'posts/' + postId,
            headers: auth
        }).then(displayPosts)
            .catch(displayError)

        function displayPosts(res) {
            postTitle.empty()
            postBody.empty()
            postComments.empty()
            postTitle.append(res.title)
            let ul = $('<ul>')
            for (let comment of res.comments) {
                ul.append(`<li>${comment}</li>`)
            }
            postComments.append(ul)
            postBody.append(res.body)
        }

        function displayError(res) {

        }
    }

}

attachEvents()