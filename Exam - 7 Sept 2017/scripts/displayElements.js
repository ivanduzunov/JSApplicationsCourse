function showHideMenuLinks() {
    if (sessionStorage.getItem('authToken') === null) {
        $("div.menu").hide()
    } else {
        $("div.menu").show()
    }
}

function showView(id) {
    console.log('show view method')
    $('section').hide()
    $('#' + id).show()
}

function showRegisterView() {
    console.log('showing register view')
    showView('viewRegister')
}

function showLoginView() {
    console.log('showing login view')
    showView('viewLogin')
}

function showHomeView() {
    showView('viewFeed')
}

function showDiscoverView() {
    showView('viewDiscover')
}

function showMeView() {
    showView('viewMe')
}

function showInfo(message) {
    console.log('showing info')
    let infoBox = $('#infoBox');
    infoBox.find('span').text(message);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut();
    }, 3000);
}

function showError(errorMsg) {
    console.log('showing error')
    let errorBox = $('#errorBox')
    errorBox.find('span').text("Error: " + errorMsg)
    errorBox.show()
    setTimeout(function () {
        errorBox.fadeOut()
    }, 5000)
}