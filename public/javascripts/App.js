// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/home', component: Home },
    { path: '/fixtures', component: Fixtures },
    { path: '/players', component: Players },
    { path: '/teams', component: Teams },
    { path: '/game/:id', component: IndividualGame },
    { path: '/players/:id', component: IndividualPlayer },
    { path: '/authentication', component: Authentication },
    { path: '/newPlayer', component: NewPlayer },
    { path: '/newStaff', component: NewStaff },
    { path: '/staff', component: Staff },
    { path: '/newTeam', component: NewTeam },
    { path: '/newGame', component: NewGame },
    { path: '/played', component: PlayedGames },
    { path: '/teams/:id', component: IndividualTeam },
    { path: '/update', component: UpdateList },
    { path: '/update/:id', component: Update }

]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
})
router.replace('/home')



//Main vue js controller
var app = new Vue({
    el: '#app',
    router,
    data: {
        User: {
            token: null,
            info: null
        },
        Login: true,
        Games: [], //Holds the latest 10 games
    },
    methods: {
        //Do this so that users don't always have to keep loging in
        getSessionData: function() {
            axios.get('/user/session')
                .then((response) => {
                    let user = {
                        token: response.data.token,
                        info: response.data.user
                    }
                    this.User = user;
                })
                .catch(error => console.log(error))
        },
        login: function(email, password) {
            axios.post('/user/login', {
                    email: email,
                    password: password
                })
                .then((response) => {
                    console.log(response.data.token);
                    let user = {
                        token: response.data.token,
                        info: response.data.user
                    }
                    this.User = user;
                }).then(() =>
                    router.replace("/home")
                )
                .catch(function(error) {
                    console.log(error);
                });

        },
        register: function(email, password, password2) {
            if (password === password2) {
                axios.post('/user/signup', {
                        email: email,
                        password: password
                    })
                    .then((response) => {
                        console.log(response.data.token);
                        let user = {
                            token: response.data.token,
                            info: response.data.user
                        }
                        this.User = user;
                    })
                    .then(() => {
                        if (this.User.token != null)
                            router.replace("/home")
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
            else {
                console.log("failed")
            }
        },
        logout: function() {
            this.User = {};
            axios.get('/user/logout')
                .then((response) => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        isAdmin: function(level) {
            if (User && User.info.adminLevel >= level)
                return true
            else
                return false

        }
    },
    created: function() {
        this.getSessionData();
        axios.get('/games/1').then((r) => {
            console.log(r);
            this.Games = r.data.games;
        })
    }
});
