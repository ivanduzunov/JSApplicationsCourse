function startApp() {
    showHiddenMenuLinks()
    $('#viewHome').show()
    attachAllEvents()
}

function showHiddenMenuLinks() {
    $('#linkHome').show()
    if (sessionStorage.getItem('authToken') === null) {
        $('#linkLogin').show()
        $('#linkRegister').show()
        $('#linkListAds').hide()
        $('#linkCreateAd').hide()
        $('#linkLogout').hide()

    } else {
        $('#linkLogin').hide()
        $('#linkRegister').hide()
        $('#linkListAds').show()
        $('#linkCreateAd').show()
        $('#linkLogout').show()
    }

}

function attachAllEvents() {
    $("#linkHome").on('click', showHomeView);
    $("#linkLogin").on('click', showLoginView);
    $("#linkRegister").on('click', showRegisterView);
    $("#linkListAds").on('click', showAdsView);
    $("#linkCreateAd").on('click', showCreateAddView);
    $("#linkLogout").on('click', showLogoutView);
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
    $('#viewHome').show()
}

function showLogoutView() {
    $('main').find('section').hide()
    $('#viewHome').show()
}