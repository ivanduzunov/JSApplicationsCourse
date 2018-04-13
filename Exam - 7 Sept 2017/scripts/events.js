function attachEvents() {
    linkContains("Register").on('click', showRegisterView)
    linkContains("Logout").on('click', showLoginView)
    linkContains("Home").on('click', showHomeView)
    linkContains("Discover").on('click', showDiscoverView)
    linkContains("Me").on('click', showMeView)
    //linkContains("Logout").on('click', showRegisterView)

    $('#btnRegister').on('click', registerUser)

    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show()
        },
        ajaxStop: function () {
            $('#loadingBox').hide()
        }
    })
}

function linkContains(text) {
    return $(`a:contains(${text})`)
}