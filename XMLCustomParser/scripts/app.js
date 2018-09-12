const handlers = {};
$(() => {
    // Define routes here using Sammy.js
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getWelcomePage);

        this.post('#/upload', handlers.uploadFiles);

    });
    app.run();
});