$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        console.log('started')
        this.get('#/index.html', (ctx) => {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/welcome/registerForm.hbs',
                loginForm: './templates/welcome/loginForm.hbs'
            })
                .then(function () {
                    this.partial('./templates/welcome/welcomeView.hbs');
                });
        });

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            if (username.length < 3 || /^[a-zA-Z]+$/.test(username) !== true) {
                auth.showError('Username should be with minimum 3 chars and containing only English letters.');
            }

            if (password !== repeatPass) {
                auth.showError('Passwords have to match!');
            }

            if (password.length < 6 || /^[a-zA-Z0-9]+$/.test(username) !== true) {
                auth.showError('Password should be with minimum 6 chars and containing only English letters and digits.');
            } else {
                auth.register(username, password)
                    .then(() => {
                        auth.showInfo(`${username} registered successfully!`)
                        ctx.redirect('#/catalog');
                    });
            }
        });

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then((userData) => {
                    auth.saveSession(userData);
                    ctx.redirect('#/catalog');
                    auth.showInfo(`${userData.username} logged in successfully!`);
                }).catch(() => {
                auth.showError(`Logged in failed.`);
            });
        });

        this.get('#/catalog', (ctx) => {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            postsService.getAllPostsSortedByPostTimeDescending()
                .then((data) => {
                    data.forEach((p, i) => {
                        p.rank = i + 1;
                        p.days = postsService.calcTime(p._kmd.ect);
                        p.isAuthor = p._acl.creator === sessionStorage.getItem('userId');
                    });
                    ctx.articles = data;
                    console.log(ctx.articles)
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navMenu: './templates/common/navMenu.hbs',
                        postArticle: './templates/catalog/postArticle.hbs'

                    }).then(function () {
                        this.partial('./templates/catalog/catalogView.hbs');
                    });
                });

        });

        this.get('#/submit', (ctx) => {
            ctx.username = sessionStorage.getItem('username');
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navMenu: './templates/common/navMenu.hbs'
            }).then(function () {
                this.partial('./templates/submit/submitForm.hbs');
            });
        });

        this.post('#/submit', (ctx) => {
            let url = ctx.params.url;
            let title = ctx.params.title;
            let imageUrl = ctx.params.image;
            let description = ctx.params.comment;

            if (url === '' || title === '') {
                auth.showError('Url and title fields are mandatory.')
            } else {
                postsService.createPost(url, title, imageUrl, description)
                    .then(() => {
                        auth.showInfo(`${title} link published.`);
                        ctx.redirect('#/catalog');
                    }).catch(() => {
                    auth.showError('Published failed.');
                });
            }
        });

        this.get('#/edit/post/:_id', (ctx) => {
            ctx.username = sessionStorage.getItem('username');
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            let id = ctx.params._id.slice(1);

            postsService.getPostById(id)
                .then((data) => {
                    ctx._id = id;
                    ctx.url = data.url;
                    ctx.title = data.title;
                    ctx.imageUrl = data.imageUrl;
                    ctx.description = data.description;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navMenu: './templates/common/navMenu.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editView.hbs');
                    });
                })
        });

        this.post('#/edit/post/:_id', (ctx) => {
            let id = ctx.params._id.slice(1);
            console.log(id)
            let url = ctx.params.url;
            let title = ctx.params.title;
            let imageUrl = ctx.params.image;
            let description = ctx.params.description;

            if (url === '' || title === '') {
                auth.showError('Url and title fields are mandatory.')
            } else {
                postsService.editPost(url, title, imageUrl, description, id)
                    .then(() => {
                        auth.showInfo(`${title} link edited.`);
                        ctx.redirect('#/catalog');
                    }).catch(() => {
                    auth.showError('Edited failed.');
                });
            }
        });

        this.get('#/details/:_id', (ctx) => {
            ctx.username = sessionStorage.getItem('username');
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            let id = ctx.params._id.slice(1);

            postsService.getPostById(id)
                .then((data) => {
                    ctx.url = data.url;
                    ctx.title = data.title;
                    ctx.imageUrl = data.imageUrl;
                    ctx.description = data.description;
                    ctx.postAuthor = data.author;
                    ctx.isAuthor = data._acl.creator === sessionStorage.getItem('userId');
                    ctx.days = postsService.calcTime(data._kmd.ect);
                    ctx.postId = id;

                    postsService.getCommentsByPostId(id)
                        .then((commentsData) => {
                            commentsData.forEach((p, i) => {
                                p.time = postsService.calcTime(p._kmd.ect);
                            });

                            ctx.comments = commentsData;

                            ctx.loadPartials({
                                header: './templates/common/header.hbs',
                                footer: './templates/common/footer.hbs',
                                navMenu: './templates/common/navMenu.hbs',
                                postArticleWithCommentsView: './templates/details/postArticleWithCommentsView.hbs',
                                commentForm: './templates/details/commentForm.hbs',
                                comment: './templates/details/comment.hbs'
                            }).then(function () {
                                this.partial('./templates/details/commentsView.hbs');
                            });
                        });
                });
        });

        this.post('#/addComment/:postId', (ctx) => {
            let postId = ctx.params.postId.slice(1);
            let author = sessionStorage.getItem('username')
            let content = ctx.params.content;

            if (content === '') {
                auth.showError('Cannot publish empty comment.')
            } else {
                postsService.createComment(postId, content, author)
                    .then(() => {
                        auth.showInfo(`Comment published.`);
                        ctx.redirect(`#/details/:${postId}`);
                    }).catch(() => {
                    auth.showError('Published failed.');
                });
            }
        });

        this.get('#/delete/post/:_id', (ctx) => {
            let id = ctx.params._id.slice(1);

            postsService.deletePost(id)
                .then(() => {
                    auth.showInfo('DELETED!');
                    ctx.redirect(`#/catalog`)
                }).catch(() => {
                auth.showError('NOT DELETED');
            })
        });

    });
    app.run();
});