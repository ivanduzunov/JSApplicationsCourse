$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', (ctx) => {
            //Todo: show the username, when the user is loggedIn
            let isLogged = sessionStorage.getItem('authtoken') !== null;
            ctx.loggedIn = isLogged;
            if (isLogged) {
                ctx.username = sessionStorage.getItem('username');
            }
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function () {
                    this.partial('./templates/home/home.hbs');
                });
        });

        this.get('#/register', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPassword;

            if (password !== repeatPass) {
                alert('Passwords have to match!');
            } else {
                auth.register(username, password);
                ctx.redirect('#/index.html');
            }
        });

        this.get('#/login', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then((userData) => {
                    auth.saveSession(userData);
                    ctx.redirect('#/index.html');
                }).catch(console.error);
        });

        this.get('#/catalog', (ctx) => {
            teamsService.loadTeams().then((userData) => {
                ctx.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined'
                ctx.teams = userData;
                console.log(sessionStorage.getItem('teamId'))
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    team: './templates/catalog/team.hbs'

                }).then(function () {
                    this.partial('./templates/catalog/teamCatalog.hbs');
                });
            });
        });

        this.get('#/create', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', (ctx) => {
            let name = ctx.params.name;
            let comment = ctx.params.comment;

            teamsService.createTeam(name, comment)
                .then((teamData) => {
                    sessionStorage.setItem('teamId', teamData._id);
                    teamsService.joinTeam(teamData._id).then(ctx.redirect('#/catalog'));
                }).catch(console.error);
        });

        this.get('#/catalog/:teamId', (ctx) => {
            let teamId = ctx.params.teamId.slice(1);
            let teamInfo;
            let membersInfo;

            getTeamInfo(teamId)
                .then(() => {
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined';
                    ctx.username = sessionStorage.getItem('username');
                    ctx.isOnTeam = sessionStorage.getItem('teamId') === teamId;
                    ctx.isAuthor = sessionStorage.getItem('userId') === teamInfo._acl.creator;
                    ctx.name = teamInfo.name;
                    ctx.comment = teamInfo.comment;
                    ctx.members = membersInfo;
                    ctx.teamId = teamId;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamControls: './templates/catalog/teamControls.hbs',
                        teamMember: './templates/catalog/teamMember.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs');
                    });
                });

            async function getTeamInfo() {
                let [teamDetails, teamMembers] = await Promise.all([
                    teamsService.loadTeamDetails(teamId),
                    teamsService.loadTeamMembers(teamId)
                ]);
                teamInfo = teamDetails;
                membersInfo = teamMembers;
            }
        });

        this.get('#/edit/:teamId', (ctx) => {
            let teamId = ctx.params.teamId.slice(1);
            console.log(ctx.params.teamId)

            console.log(teamId)
            teamsService.loadTeamDetails(teamId).then((teamDetails) => {
                ctx.name = teamDetails.name;
                ctx.comment = teamDetails.comment;
                console.log(teamId)

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    editForm: './templates/edit/editForm.hbs'
                }).then(function () {
                    this.partial('./templates/edit/editPage.hbs');
                });
            });
        });

        this.post('#/edit/:teamId', (ctx) => {
            let teamId = ctx.params.teamId.slice(1);
            let name = ctx.params.name;
            let comment = ctx.params.comment;

            teamsService.edit(teamId, name, comment)
                .then(() => {
                    ctx.redirect(`#/catalog`)
                }).catch(console.error);
        });

    });
    app.run();
});