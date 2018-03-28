function loadCommits() {
    let commitsUl = $('ul#commits')
    commitsUl.empty()
    let username = $('input#username').val()
    let repository = $('input#repo').val()

    if (username !== '' && repository !== '') {
        let url = `https://api.github.com/repos/${username}/${repository}/commits`

        $.get(url).then(handleSuccess).catch(handleError)

        function handleSuccess(res) {
            for (let key of res) {
                let obj = key.commit
                let author = obj.author.name
                let message = obj.message
                let li = $(`<li>${author}: ${message}</li>`)
                commitsUl.append(li)
            }
        }

        function handleError(err) {
            commitsUl.append($(`<li>Error: ${err.status} (${err.statusText})</li>`))
        }
    }
}
