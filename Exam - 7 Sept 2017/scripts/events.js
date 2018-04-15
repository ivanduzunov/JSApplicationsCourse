function attachAllEvents() {
    $(`a:contains('Register')`).on('click',showRegisterView )
    $(`a:contains('Log in')`).on('click', showLoginView)
    $(`a:contains('Home')`).on('click', showHomeView)

    $('#btnRegister').on('click', registerUser)
    $('#btnLogin').on('click', loginUser);
    $("button").on('click', function (event) {
        event.preventDefault();
    });

    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show()
        },
        ajaxStop: function () {
            $('#loadingBox').hide()
        }
    })
}