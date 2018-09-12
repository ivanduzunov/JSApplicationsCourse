function UploadXML() {
    let directory = $("input#directory").val();
    if (directory === '') {
        $('span').text(directory + ' invalid!');
        $('#errorBox').fadeIn();
        setTimeout(() => $('#errorBox').fadeOut(), 3000);
    } else {
        console.log(directory);
        service.uploadDirectory(directory);
        $('#result').text(`${directory}`)
    }
}

handlers.getWelcomePage = function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.loadPartials({
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/welcome.hbs');
    })
};

handlers.uploadFiles = function (ctx) {

};