function startApp() {
    showHiddenMenuLinks()
    $('#viewHome').show()
    attachAllEvents()
}

function showHiddenMenuLinks() {
    $('#linkHome').show()
    if (sessionStorage.getItem('authtoken') === null) {
        $('#linkLogin').show()
        $('#linkRegister').show()
        $('#linkListAds').hide()
        $('#linkCreateAd').hide()
        $('#linkLogout').hide()
        $('#loggedInUser').empty()

    } else {
        $('#linkLogin').hide()
        $('#linkRegister').hide()
        $('#linkListAds').show()
        $('#linkCreateAd').show()
        $('#linkLogout').show()
        $('#loggedInUser').text('Hello, ' + sessionStorage.getItem('username')).show()
    }

}

function attachAllEvents() {
    $("#linkHome").on('click', showHomeView)
    $("#linkLogin").on('click', showLoginView)
    $("#linkRegister").on('click', showRegisterView)
    $("#linkListAds").on('click', showAdsView)
    $("#linkCreateAd").on('click', showCreateAddView)
    $("#linkLogout").on('click', logoutUser)

    $("#buttonRegisterUser").on('click', registerUser)
    $("#buttonLoginUser").on('click', loginUser)
    $("#buttonCreateAd").on('click', createAdd)


    $("#infoBox, #errorBox").on('click', function () {
        $(this).fadeOut();
    })
}

function showHomeView() {
    $('main').find('section').hide()
    $('#viewHome').show()
}

function showLoginView() {
    $('main').find('section').hide()
    $('#viewLogin').show()
}

function showRegisterView() {
    $('main').find('section').hide()
    $('#viewRegister').show()
}

function showAdsView() {
    $('main').find('section').hide()
    $('#viewHome').show()
}

function showCreateAddView() {
    $('main').find('section').hide()
    $('#viewCreateAd').show()
}


function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.text(message);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut();
    }, 3000);
}

function showError(errorMsg) {
    let errorBox = $('#errorBox');
    errorBox.text("Error: " + errorMsg);
    errorBox.show();
}