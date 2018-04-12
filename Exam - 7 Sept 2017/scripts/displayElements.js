function showHideMenuLinks() {
    if (sessionStorage.getItem('authToken') === null) {
        $("div.menu").hide()
    } else {
        $("div.menu").show()
    }
}

function showView(id) {
    $('section').hide()
    $('#' + id).show()
}

function showRegisterView() {
    showView('viewRegister')
}

function showLoginView() {
    showView('viewLogin')
}

//function showHomeView() {
// showView('viewRegister')
//}

function showDiscoverView() {
    showView('viewDiscover')
}

function showMeView() {
    showView('viewMe')
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
    errorBox.show()
}

function hideError() {
    $('#errorBox').hide()
}