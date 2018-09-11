handlers.getFeedPage = function (ctx) {
    ctx.isAuth = authService.isAuth;
    if (!authService.isAuth()) {
        notify.showError('You must log in to access the feed.')
        ctx.redirect('#/login');
    }
    let username = sessionStorage.getItem('username');
    ctx.username = username;
    ctx.myId = sessionStorage.getItem('userId');
    memeService.getAllMemes()
        .then((data) => {
            console.log(data)
            ctx.noMemes = data.length === 0;
            if (data.length > 0) {
                data.forEach((p) => {
                    p.isAuthor = p.creator === username;
                    p.creatorId = p._acl.creator;
                });
            }
            console.log(data);
            ctx.memes = data;
            ctx.loadPartials({
                memeListing: './templates/meme/memeListing.hbs',
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/meme/feed.hbs');
            })
        });
};

handlers.getCreateMemePage = async function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        memeForm: './templates/forms/memeCreate.hbs',
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/meme/create.hbs');
    })
};

handlers.createMeme = function (ctx) {
    const title = ctx.params.title;
    const description = ctx.params.description;
    const imageUrl = ctx.params.imageUrl;
    const creator = sessionStorage.getItem('username');

    if (title.length < 1) {
        notify.showError('Title lenght too short!');
    } else if (title.length > 33) {
        notify.showError('Title lenght must be maximum 33 charachters!');
    } else if (description.length < 30) {
        notify.showError('Description is too short. Must be at least 30 charachters!');
    } else if (description.length > 450) {
        notify.showError('Description is too big. Must be maximum 450 charachters!');
    } else if (imageUrl.substr(0, 4) !== 'http') {
        notify.showError('Link url should always start with “http”!');
    } else {
        memeService.createMeme
        (title, description, imageUrl, creator)
            .then(() => {
                notify.showInfo('meme created.');
                ctx.redirect('#/feed');
            })
            .catch(notify.handleError)
    }
};

handlers.getMemeDetailsPage = function (ctx) {
    let username = sessionStorage.getItem('username');
    ctx.isAuth = authService.isAuth;
    ctx.username = username;

    memeService.getMemeById(ctx.params._id)
        .then((data) => {
            ctx.title = data.title;
            ctx.imageUrl = data.imageUrl;
            ctx.description = data.description;
            ctx._id = data._id;
            ctx.creator = data.creator;
            ctx.isAuthor = data.creator === username;
            ctx.creatorId = data._acl.creator;

            ctx.loadPartials({
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/meme/details.hbs');
            })
        });
}

handlers.getEditMemePage = function (ctx) {
    ctx.isAuth = authService.isAuth;
    ctx.username = sessionStorage.getItem('username');

    memeService.getMemeById(ctx.params._id)
        .then((data) => {
            let obj = {
                creator: data.creator,
                title: data.title,
                imageUrl: data.imageUrl,
                description: data.description,
                _id: data._id
            };

            ctx.meme = obj;

            if (obj.creator !== sessionStorage.getItem('username')) {
                notify.showInfo('You are not allowed to edit this Meme.');
                ctx.redirect(`#/feed`);
            }

            ctx.loadPartials({
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs',
                editForm: './templates/forms/memeEdit.hbs'
            }).then(function () {
                this.partial('./templates/meme/edit.hbs');
            })
        });
}

handlers.editMeme = function (ctx) {
    const title = ctx.params.title;
    const description = ctx.params.description;
    const imageUrl = ctx.params.imageUrl;
    const _id = ctx.params._id;
    const creator = sessionStorage.getItem('username');

    if (title.length < 1) {
        notify.showError('Title lenght too short!');
    } else if (title.length > 33) {
        notify.showError('Title lenght must be maximum 33 charachters!');
    } else if (description.length < 30) {
        notify.showError('Description is too short. Must be at least 30 charachters!');
    } else if (description.length > 450) {
        notify.showError('Description is too big. Must be maximum 450 charachters!');
    } else if (imageUrl.substr(0, 4) !== 'http') {
        notify.showError('Link url should always start with “http”!');
    } else {
        memeService.editMeme
        (title, description, imageUrl, creator, _id)
            .then(() => {
                notify.showInfo('meme edited.');
                ctx.redirect('#/feed');
            })
            .catch(notify.handleError)
    }
};

handlers.deleteMeme = async function (ctx) {
    let username = sessionStorage.getItem('username');
    ctx.isAuth = authService.isAuth;
    ctx.username = username;
    let _id = ctx.params._id;

    memeService.deleteMeme(_id)
        .then(() => {
            notify.showInfo('meme deleted.');
            ctx.redirect('#/feed');
        });
};