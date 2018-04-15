function showView(viewName) {
    $('section').hide(); // Hide all views
    $('#' + viewName).show(); // Show the selected view only
}

function showHideMenuLinks() {
    if (sessionStorage.getItem('authToken') === null) { // No logged in user
        $("div.menu").hide();
    } else { // We have logged in user
        $("div.menu").show();
    }
}

function showHomeView() {
    showView('viewFeed');
}

function showLoginView() {
    $('#formLogin').trigger('reset');
    showView('viewLogin');
}

function showRegisterView() {
    $('#formRegister').trigger('reset');
    showView('viewRegister');
}

function showCreateAdView() {
    $('#formCreateAd').trigger('reset');
    showView('viewCreateAd');
}

function showViewAdsView() {
    showView('viewAds');
}

function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.find('span').text(message);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut();
    }, 3000);
}

function showError(errorMsg) {
    let errorBox = $('#errorBox');
    errorBox.find('span').text("Error: " + errorMsg);
    errorBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut();
    }, 5000);
}