handlers.getUserProfilePage = function (ctx) {
    let username = sessionStorage.getItem('username');
    ctx.isAuth = authService.isAuth;
    ctx.userId = ctx.params._id;
    ctx.username = username;

    profileService.getUserProfile(ctx.params._id)
        .then((data) => {
            ctx.profileUsername = data.username;
            ctx.profileImageUrl = data.imageUrl;
            ctx.profileDescription = data.description;
            ctx._id = data._id;
            ctx.isMe = data.username === sessionStorage.getItem('username');
            console.log(ctx.isMe);


            profileService.getMemesByUsername(data.username)
                .then((memeData) => {
                    console.log(memeData)
                    ctx.noMemes = memeData.length === 0;
                    if (memeData.length > 0) {
                        memeData.forEach(m => {
                            m.creatorId = m._acl.creator;
                            m.memeId = m._id;
                            m.isMe = m._acl.creator = sessionStorage.getItem('username');
                        });
                    }
                    console.log(memeData);
                    ctx.memes = memeData;
                    ctx.loadPartials({
                        navbar: './templates/common/navbar.hbs',
                        footer: './templates/common/footer.hbs',
                        userMeme: './templates/meme/userMeme.hbs'
                    }).then(function () {
                        this.partial('./templates/auth/userProfileView.hbs');
                    })

                })
        })
};