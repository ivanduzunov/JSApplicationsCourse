$(() => {
    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show()
        },
        ajaxStop: function () {
            $('#loadingBox').hide()
        }
    });

    const app = Sammy(('#main', function () {
        this.use('Handlebars', 'hbs');

    }));
    app.run();
});