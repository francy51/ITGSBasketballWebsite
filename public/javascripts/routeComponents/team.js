const Staff = {
    template: `
        <div>
            <div v-if="staffs.length > 0"> 
                <h2 class="text-center"> Staff </h2>
                <div v-for='staff in staffs'>
                    <staff-tab v-bind:staff='staff' ></staff-tab>
                </div>
                <div class='text-center row'>
                    <div class="col" >
                        <button v-if="page > 1" v-on:click="getStaff(page-1)">previous</button>
                    </div>
                    <div class="col">
                        {{page}}
                    </div>
                    <div class="col" >
                        <button v-if="staffs.length == 10" v-on:click="getStaff(page+1)">next</button>
                    </div>
                </div>
            </div>
            <div v-else>
               <h1> Loading..</h1>
            </div>
        </div>
    `,
    data: function() {
        //This works already checked
        return {
            staffs: {},
            page: 1
        }
    },
    methods: {
        getStaff: function(page) {
            axios.get('/staff/' + page).then((response) => {
                    console.log(response.data);
                    this.staffs = response.data.staff
                    this.page = page;
                    window.scrollTo(0, 0);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created: function() {
        this.getStaff(this.page);
    }
}
const Players = {
    template: `
        <div>
            <div v-if="players.length > 0">
                <h2 class="text-center"> Players </h2>
                <div v-for='player in players'>
                    <player-tab v-bind:player='player' ></player-tab>
                </div>
                <div class='text-center row'>
                    <div class="col" >
                        <button v-if="page > 1" v-on:click="getPlayers(page-1)">previous</button>
                    </div>
                    <div class="col">
                        {{page}}
                    </div>
                    <div class="col" >
                        <button v-if="players.length == 10" v-on:click="getPlayers(page+1)">next</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1> Loading... </h1>
            </div>

        </div>
    `,
    data: function() {
        //This works already checked
        return {
            players: {},
            page: 1
        }
    },
    methods: {
        getPlayers: function(page) {
            axios.get('/players/' + page).then((response) => {
                    console.log(response.data);
                    this.players = response.data.players
                    this.page = page;
                    window.scrollTo(0, 0);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created: function() {
        this.getPlayers(this.page);
    }
}
const Teams = {
    template: `
        <div>
            <div v-if="teams.length > 0">
                <h2 class="text-center"> Teams </h2>
                <div v-for='team in teams'>
                    <team-tab v-bind:team='team' ></team-tab>
                </div>
                <div class='text-center row'>
                    <div class="col" >
                        <button v-if="page > 1" v-on:click="getTeams(page-1)">previous</button>
                    </div>
                    <div class="col">
                        {{page}}
                    </div>
                    <div class="col" >
                        <button v-if="teams.length == 10" v-on:click="getTeams(page+1)">next</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1> Loading... </h1>
            </div>

        </div>
    `,
    data: function() {
        //This works already checked
        return {
            teams: {},
            page: 1
        }
    },
    methods: {
        getTeams: function(page) {
            axios.get('/teams/' + page).then((response) => {
                    console.log(response.data);
                    this.teams = response.data.teams
                    this.page = page;
                    window.scrollTo(0, 0);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created: function() {
        this.getTeams(this.page);
    }
}


const IndividualPlayer = {
    template: `
        <div v-if="player"> 
            <player-profile v-bind:player="player"> </player-profile>
  
            <div class="row">
                <div class="col">
                    Opponent
                </div>
                <div class="col">
                    Points
                </div>
                <div class="col">
                    Personal Fouls
                </div>
            </div>
            <individual-stats v-for="stat in stats" v-bind:stat="stat" v-bind:key="stat.id" class="no-bullets"></individual-stats>
        </div>
    `,
    data: function() {
        return {
            player: {},
            stats: {}
        }
    },
    methods: {
        getPlayer: function() {
            axios.get('/player/' + this.$route.params.id).then(
                (r) => {
                    console.log(r);
                    this.player = r.data.player;
                })
        },
        getStats: function() {
            axios.get('/stats/' + this.$route.params.id).then(
                (r) => {
                    console.log(r);
                    this.stats = r.data.stats;
                    console.log(r.data.stats)
                })
            //TODO: request data from server. Don't do this here since it would take up too many resources to store every single games data in the long run
        }
    },
    created: function() {
        this.getPlayer();
        this.getStats();
    }
}

const IndividualTeam = {
    template: `
        <div v-if="team">
            <team-tab v-bind:team='team' ></team-tab>
            <h3>Staff:</h3>
            <ul class="no-bullets">
                <li v-for="staff in team.staff">{{staff.role}} {{staff.firstName}} {{staff.lastName}}t</li>
            </ul>
            <h3>Players:</h3>
            <ul class="no-bullets">
                <li v-for="player in team.players">{{player.firstName}} {{player.lastName}}t</li>
            </ul>
        </div>
    `,
    data: function() {
        return {
            team: {}
        }
    },
    methods: {
        getTeam: function() {
            axios.get('/team/' + this.$route.params.id).then((r) => {
                this.team = r.data.team;
                console.log(r)
            })
        }
    },
    created: function() {
        this.getTeam();
    }
}
const Authentication = {
    template: `
        <div>
            <div>
                <div v-if="Login">
                    <div class="login-form">
                        <form>
                            <h2 class="text-center">Log in</h2>       
                            <div class="form-group">
                                <input type="text" class="form-control custom-control" placeholder="Email" required="required" v-model="email" >
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control custom-control" placeholder="Password" required="required" v-model="password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block" v-on:click="login">Log in</button>
                            </div>
                            <div class="clearfix">
                                <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
                                <a href="#" class="pull-right">Forgot Password?</a>
                            </div>        
                        </form>
                    </div>
                    
            <button class="btn" v-on:click="swap">Register Now!</button>
                </div>
                <div v-else>
                    <div class="register-form">
                        <form>
                            <h2 class="text-center">Register</h2>       
                            <div class="form-group">
                                <input type="text" class="form-control custom-control" placeholder="Email" required="required" v-model="email">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control custom-control" placeholder="Password" required="required" v-model="password">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control custom-control" placeholder="Repeat Password" required="required" v-model="password2">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block" v-on:click="register">Register</button>
                            </div>
                        </form>
                    </div>
                    
                    <button class="btn" v-on:click="swap">Log in Now!</button>
                </div>
            </div>
            
        </div>
    `,
    data: function() {
        return {
            email: "",
            password: "",
            password2: ""
        }
    },
    computed: {
        Login: function() {
            return this.$parent.Login;
        },
    },
    methods: {
        swap: function() {
            this.$parent.Login = !this.$parent.Login;
        },
        login: function() {
            this.$parent.login(this.email, this.password);
        },
        register: function() {
            this.$parent.register(this.email, this.password, this.password2);
        }
    }
}
