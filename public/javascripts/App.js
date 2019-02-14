//List component for the side bar
Vue.component('latest-game', {
    props: ['game'],
    template: `
    <li>
        <router-link class="nav-link" :to="/game/ + game._id">
            <div class="row">
                <div class="col">{{game.home.name}} </div>
                vs
                <div class="col">{{game.away.name}} </div>
            </div>
            <div class="row">
                <div class="col">{{game.home.score}} </div>
                -
                <div class="col">{{game.away.score}} </div>
            </div>
        </router-link>
    </li>
    `

})

Vue.component('individual-stats', {
    props: ['stat'],
    template: `
     <li>
        <router-link class="nav-link" :to="/teams/ + stat.opponentId">
            <div class="row">
                <div class="col">
                    {{stat.opponent}}
                </div>
                <div class="col" v-if="stat.score">
                    {{stat.score}}
                </div>
                <div class="col" v-if="stat.fouls">
                    <template  v-for="n in fouls">
                    <span id="live-dot" class="dot" v-if="n == 5"></span>
                    <span id="foul-dot" class="dot" v-else></span>
                    </template>
                </div>
            </div>
        </router-link>
    </li>
    `,
    computed: {
        fouls: function() {
            return Number(this.stat.fouls)
        }
    }
})

Vue.component('player-stats', {
    props: ['player'],
    template: `
     <li>
        <router-link class="nav-link" :to="/players/ + player.id">
            <div class="row">
                <div class="col">
                    {{player.lastName}}
                </div>
                <div class="col" v-if="player.score">
                    {{player.score}}
                </div>
                <div class="col" v-if="player.fouls">
                    <template  v-for="n in fouls">
                    <span id="live-dot" class="dot" v-if="n == 5"></span>
                    <span id="foul-dot" class="dot" v-else></span>
                    </template>
                </div>
            </div>
        </router-link>
    </li>
    `,
    computed: {
        fouls: function() {
            return Number(this.player.fouls)
        }
    }
})

Vue.component('team-stats', {
    props: ['team'],
    template: `
    <ul class="no-bullets">
        <li>
            <div class="row">
                <div class="col">
                    Player Name
                </div>
                <div class="col">
                    Points
                </div>
                <div class="col">
                    Personal Fouls
                </div>
            </div>
        </li>
        <player-stats v-for="player in team.players" v-bind:player="player" v-bind:key="player.id"></player-stats>
        <div class="row" v-if="team.score">
                <div class="col">
              
                </div>
                <div class="col">
                    {{team.score}}
                </div>
                <div class="col">

                </div>
            </div>
    </ul>
    `
})

Vue.component('player-profile', {
    props: ['player'],
    template: `
    <div class="row well">
        <div class="col-2">
            <img src="http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-hi.png" class="img-fluid"/>
        </div>
        <div class="col">
            <h1>{{player.firstName}} {{player.lastName}}</h1>
            <ul class="no-bullets">
                <li>Height : {{player.height}} CM </li>
                <li>Nationality : {{player.nationality}}</li>
                <li>Born on {{player.birthday}}</li>
            </ul>
        </div>
    </div>
    `
})

Vue.component('player-tab', {
    props: ['player'],
    template: `
    <div class='row well'>
         <div class="col-2">
            <img src="http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-hi.png" class="img-fluid"/>
        </div>
        <div class='col'>
            <h3>{{player.firstName}} {{player.lastName}}</h3>
        </div>
        <div class='col'>
            <h3>{{player.nationality}}</h3>
        </div>
        <div class='col'>
            <h3>{{player.birthday}}</h3>
        </div>
    </div>
    `
})

Vue.component('staff-tab', {
    props: ['staff'],
    template: `
    <div class='row well'>
         <div class="col-2">
            <img src="http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-hi.png" class="img-fluid"/>
        </div>
        <div class='col'>
            <h3>{{staff.firstName}} {{staff.lastName}}</h3>
        </div>
        <div class='col'>
            <h3>{{staff.nationality}}</h3>
        </div>
        <div class='col'>
            <h3>{{staff.role}}</h3>
        </div>
    </div>
    `
})

Vue.component('team-tab', {
    props: ['team'],
    template: `
    <div class='row well'>
         <div class="col-2">
            <img v-bind:src="url" class="img-fluid"/>
        </div>
        <div class='col'>
            <h3>{{team.name}}</h3>
        </div>
    </div>
    `,
    computed: {
        url: function() {
            return '/uploads/' + this.team.logo
        }
    }

})


Vue.component('game-tab', {
    props: ['game'],
    template: `
    <div class='row well text-center'>
         <div class="col-2">
            <img v-bind:src="urlHome" class="img-fluid"/>
            <h3>{{game.home.name}}</h3>
            <h3>{{game.home.score}}</h3>
        </div>
        <div class='col'>
            <h1> VS </h1>
        </div>
        <div class="col">
            <h3>{{game.away.score}}</h3>
            <h3>{{game.away.name}}</h3>
            <img v-bind:src="urlAway" class="img-fluid"/>
        </div>
    </div>
    `,
    computed: {
        urlHome: function() {
            return '/uploads/' + this.game.home.logo
        },
        urlAway: function() {
            return '/uploads/' + this.game.away.logo
        }

    }

})


// 1. Define route components.
// These can be imported from other files
const Home = {
    template: `
    <div>
        <h1>Welcome to the ESF Tigers Stats site.</h1>
        <br/>
        <div style="width:70%;" id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_165f02c38df%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_165f02c38df%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="First slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_165f02c38e0%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_165f02c38e0%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22217.75625%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Second slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_165f02c38e1%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_165f02c38e1%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277.0078125%22%20y%3D%22217.75625%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Third slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
    `

}
const Fixtures = {
    template: `
        <div>
            <div v-if="fixtures.length > 0">
                <h2 class="text-center"> Players </h2>
                <div v-for='fixture in fixtures'>
                    <game-tab v-bind:game='fixture' ></game-tab>
                </div>
                <div class='text-center row'>
                    <div class="col" >
                        <button v-if="page > 1" v-on:click="getFixtures(page-1)">previous</button>
                    </div>
                    <div class="col">
                        {{page}}
                    </div>
                    <div class="col" >
                        <button v-if="fixtures.length == 10" v-on:click="getFixtures(page+1)">next</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1> Loading... (If this doesn't load then there might not be any fixture)</h1>
            </div>

        </div>
    `,
    data: function() {
        //This works already checked
        return {
            fixtures: [],
            page: 1
        }
    },
    methods: {
        getFixtures: function(page) {
            axios.get('/fixtures/' + page).then((response) => {
                    console.log(response.data);
                    this.fixtures = response.data.games
                    this.page = page;
                    window.scrollTo(0, 0);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created: function() {
        this.getFixtures(this.page);
    }
}
const PlayedGames = {
    template: `
        <div>
            <div v-if="played.length > 0">
                <h2 class="text-center"> Games played </h2>
                <div v-for='game in played'>
                    <game-tab v-bind:game='game' ></game-tab>
                </div>
                <div class='text-center row'>
                    <div class="col" >
                        <button v-if="page > 1" v-on:click="getPlayedGames(page-1)">previous</button>
                    </div>
                    <div class="col">
                        {{page}}
                    </div>
                    <div class="col" >
                        <button v-if="played.length == 10" v-on:click="getPlayedGames(page+1)">next</button>
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
            played: [],
            page: 1
        }
    },
    methods: {
        getPlayedGames: function(page) {
            axios.get('/played/' + page).then((response) => {
                    console.log(response.data);
                    this.played = response.data.games
                    this.page = page;
                    window.scrollTo(0, 0);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created: function() {
        this.getPlayedGames(this.page);
    }
}
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
const NewPlayer = {
    template: `
    <div>
        <h1> Add a player</h1>
        <form>
            <div class="form-group">
                <label for="playerFirstName">First Name</label>
                <input type="text" class="form-control" id="playerFirstName" v-model="firstName">
            </div>
            <div class="form-group">
                <label for="playerLastName">Last Name</label>
                <input type="text" class="form-control" id="playerLastName" v-model="lastName">
            </div>
            <div class="form-group">
                <label for="playerHeight">Height</label>
                <input type="number" class="form-control" id="playerHeight" v-model="height">
            </div>
            <div class="form-group">
                <label for="playerNationality">Nationality</label>
                <input type="text" class="form-control" id="playerNationality" v-model="nationality">
            </div>
            <div class="form-group">
                <label for="playerDOB">Date of Birth</label>
                <input class="form-control" type="date" id="playerDOB" v-model="birthday">
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" v-on:click="AddPlayer">Add Player</button>
            </div>
        </form>
    </div>`,
    data: function() {
        //This works already checked
        return {
            firstName: "",
            lastName: "",
            height: 0,
            nationality: "",
            birthday: ""
        }
    },
    methods: {
        AddPlayer: function() {

            //Use axios request to post data but first validation
            axios.post('/admin/newplayer', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    height: this.height,
                    nationality: this.nationality,
                    birthday: this.birthday,
                    token: this.$parent.User.token
                })
                .then((response) => {
                    console.log(response.data);
                }).then(() =>
                    router.replace("/home")
                )
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
}
const NewStaff = {
    template: `
    <div>
            <h1> Add a staff member</h1>
            <form>
                <div class="form-group">
                    <label for="playerFirstName">First Name</label>
                    <input type="text" class="form-control" id="playerFirstName" v-model="firstName">
                </div>
                <div class="form-group">
                    <label for="playerLastName">Last Name</label>
                    <input type="text" class="form-control" id="playerLastName" v-model="lastName">
                </div>
                <div class="form-group">
                    <label for="role">Role</label>
                    <input type="text" class="form-control" id="role" v-model="role">
                </div>
                <div class="form-group">
                    <label for="playerNationality">Nationality</label>
                    <input type="text" class="form-control" id="playerNationality" v-model="nationality">
                </div>
                <div class="form-group">
                    <label for="playerDOB">Date of Birth</label>
                    <input class="form-control" type="date" id="playerDOB" v-model="birthday">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" v-on:click="AddStaff">Add Player</button>
                </div>
            </form>
        
    </div>`,
    data: function() {
        //This works already checked
        return {
            firstName: "",
            lastName: "",
            role: "",
            nationality: "",
            birthday: ""
        }
    },
    methods: {
        AddStaff: function() {

            //Use axios request to post data but first validation
            axios.post('/admin/newStaff', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    role: this.role,
                    nationality: this.nationality,
                    birthday: this.birthday,
                    token: this.$parent.User.token
                })
                .then((response) => {
                    console.log(response.data);
                }).then(() =>
                    router.replace("/home")
                )
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
}
const NewTeam = {
    template: `
    <div>
        <div>
            <h1> Add a teamr</h1>
            <form>
                <div class="form-group">
                    <label for="name">Team Name</label>
                    <input type="text" class="form-control" id="name" v-model="name">
                </div>
                 <div class="form-group">
                    <label for="logo">Logo</label>
                    <input type="file" class="form-control"  id="logo" v-on:change="ProcessFile($event)">
                </div>
                
                <button v-on:click="AddPlayer" > Add a player </button>
                <div v-for="(player, index) in  players" >
                    <select v-model="players[index]">
                        <template  v-for="p in allPlayers">
                            <option v-bind:value="p">{{p.firstName}} {{p.lastName}}</option>
                        </template>
                    </select>
                    <button v-on:click="RemovePlayer(index)">remove</button>
                </div>
                <button v-on:click="AddStaff" > Add a staff member </button>
                <div v-for="(s, index) in  staff" >
                    <select v-model="staff[index]">
                        <template  v-for="st in allStaff">
                            <option v-bind:value="st">{{st.role}} {{st.lastName}}</option>
                         </template>
                    </select>
                    <button v-on:click="RemoveStaff(index)">remove</button>
                </div>
                <button v-on:click="AddTeam()"> Add Team </button>
            </form>
        </div>
        
    </div>`,
    data: function() {
        //This works already checked
        return {
            name: "",
            players: [],
            allPlayers: {},
            staff: [],
            allStaff: {},
            logo: ''

        }
    },
    methods: {
        ProcessFile: function(event) {
            this.logo = event.target.files[0]
        },
        AddPlayer: function() {
            this.players.push({});
            console.log(this.players)
        },
        AddStaff: function() {
            //push an empty object
            this.staff.push({});
            console.log(this.staff)

        },
        AddTeam: function() {


            let formData = new FormData();
            formData.append('file', this.logo);


            axios.post('/admin/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {
                    axios.post('/admin/newTeam', {
                        name: this.name,
                        players: this.players,
                        staff: this.staff,
                        logo: this.logo.name
                    })
                })
                .then((r) => {
                    console.log(r.data);
                }).then(() =>
                    router.replace("/home")
                )
                .catch(function(error) {
                    console.log(error);
                });
        },
        getStaff: function() {
            axios.get('/staff').then((response) => {
                    this.allStaff = response.data.staff
                    console.log(this.allStaff)
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getPlayers: function() {
            axios.get('/players').then((response) => {
                    this.allPlayers = response.data.players
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        RemovePlayer: function(index) {
            this.players.splice(index, 1);
        },
        RemoveStaff: function(index) {
            this.staff.splice(index, 1);
        }
    },
    created: function() {
        this.getPlayers();
        this.getStaff();
    }
}
const NewGame = {
    template: `
    <div>
        <h1> Add a Game</h1>
        <form>
            <div class="form-group">
                <label for="date">Date</label>
                <input class="form-control" type="date" id="date" v-model="date">
            </div>
            <div class="form-group">
                <label for="time">Date</label>
                <input class="form-control" type="time" id="time" v-model="time">
            </div>
            <div class="form-group">
                <label for="isPlayed">Game already finished?</label>
                <input class="form-control" type="checkbox" id="isPlayed" v-model="isPlayed">
            </div>
            <div>
                <h1> Referees </h1>
                <button v-on:click="AddReferee" > Add a referee </button>
                <div v-for="(referee, index) in  referees" >
                    <select v-model="referees[index]">
                        <template  v-for="r in allReferees">
                            <option v-bind:value="r">{{r.firstName}} {{r.lastName}}</option>
                        </template>
                    </select>
                    <button v-on:click="RemoveReferee(index)">remove</button>
                </div>
            </div>
        
            <div>
                <h1> Home </h1>
                <select v-model="home">
                    <template  v-for="team in allTeams">
                        <option v-bind:value="team">{{team.name}}</option>
                    </template>
                </select>
                <div v-if="home != {}">
                    <div v-for="player in home.players">
                        <h3>{{player.firstName}} {{player.lastName}}</h3>
                        <div class="form-group">
                            <label for="score">Score</label>
                            <input type="number" class="form-control" id="score" v-model="player.score">
                        </div>
                        <div class="form-group">
                            <label for="fouls">Fouls</label>
                            <input type="number" class="form-control" id="fouls" v-model="player.fouls">
                        </div>
                    </div>
                </div>
                <h3>Team Score : {{homeScore}}</h3>
            </div>
            
            <div>
                <h1> Away </h1>
                <select v-model="away">
                    <template  v-for="team in allTeams">
                        <option v-bind:value="team">{{team.name}}</option>
                    </template>
                </select>
                <div v-if="away != {}">
                    <div v-for="player in away.players">
                        <h3>{{player.firstName}} {{player.lastName}}</h3>
                        <div class="form-group">
                            <label for="score">Score</label>
                            <input type="number" class="form-control" id="score" v-model="player.score">
                        </div>
                        <div class="form-group">
                            <label for="fouls">Fouls</label>
                            <input type="number" class="form-control" id="fouls" v-model="player.fouls">
                        </div>
                    </div>
                </div>
                <h3>Team Score : {{awayScore}}</h3>
            </div>
        
            <button v-on:click="AddGame()">Add Game</button>

        </form>
    </div>`,
    data: function() {
        //This works already checked
        return {
            allReferees: [],
            allTeams: [],
            referees: [],
            home: {},
            away: {},
            time: "",
            date: "",
            isPlayed: false
        }
    },
    methods: {
        AddReferee: function() {
            //push an empty object
            this.referees.push({});
            console.log(this.referees)

        },
        AddGame: function() {
            axios.post('/admin/newGame', {
                    referees: this.referees,
                    home: this.home,
                    away: this.away,
                    date: this.date,
                    time: this.time,
                    isPlayed: this.isPlayed

                })
                .then((r) => {
                    console.log(r.data);
                }).then(() =>
                    router.replace("/home")
                )
                .catch(function(error) {
                    console.log(error);
                });
        },
        getReferees: function() {
            axios.get('/referees').then((response) => {
                    this.allReferees = response.data.staff
                    console.log(this.allReferees)
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getTeams: function() {
            axios.get('/teams').then((response) => {
                    this.allTeams = response.data.teams
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        RemoveReferee: function(index) {
            this.referees.splice(index, 1);
        }
    },
    created: function() {
        this.getTeams();
        this.getReferees();
    },
    computed: {
        homeScore: function() {
            if (this.home == {})
                return 0;
            let tot = 0;
            console.log(this.home.players)
            for (let index in this.home.players) {
                if (!isNaN(this.home.players[index].score))
                    tot += Number(this.home.players[index].score)
            }
            this.home.score = tot;
            return tot;
        },
        awayScore: function() {
            if (this.away == {})
                return 0;
            let tot = 0;
            for (let index in this.away.players) {
                if (!isNaN(this.away.players[index].score))
                    tot += Number(this.away.players[index].score)
            }
            this.away.score = tot;
            return tot;
        }
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
const IndividualGame = {
    template: `
        <div>
            <div v-if="game">
                <div id="fixtureHeader" class="row">
                    <h6>Date - {{game.date}}</h6>
                    <h6>Location - {{game.location}}</h6>
                    <h6> Time - {{game.time}}</h6> 
                </div>
                <div class="fixtureBody">
                        <div class="row">
                        <div class="col">
                            {{game.home.name}}
                            <team-stats v-bind:team="game.home" ></team-stats>
                        </div>
                        <div class="col">
                            {{game.away.name}}
                            <team-stats v-bind:team="game.away"></team-stats>
                        </div>
                    </div>
                </div>
                </div class="fixtureFooter>
                <div>
            </div>
        </div>
    `,
    data: function() {
        return {
            game: {}
        }
    },
    methods: {
        getGame: function() {
            axios.get('/game/' + this.$route.params.id).then((r) => {
                this.game = r.data.game;
                console.log(r);
            })
        }
    },
    created: function() {
        this.getGame();
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
const UpdateList = {
    template: `
        <div>
            <div v-if="fixtures.length > 0">
                <h2 class="text-center"> Fixtures </h2>
                <div v-for='game in fixtures'>
                    <game-tab v-bind:game='game' ></game-tab>
                    <router-link class="nav-link" :to="/update/ + game._id">Update a fixture</router-link>
                </div>
                <div class='text-center row'>
                    <div class="col" >
                        <button v-if="page > 1" v-on:click="getPlayedGames(page-1)">previous</button>
                    </div>
                    <div class="col">
                        {{page}}
                    </div>
                    <div class="col" >
                        <button v-if="fixtures.length == 10" v-on:click="getPlayedGames(page+1)">next</button>
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
            fixtures: [],
            page: 1
        }
    },
    methods: {
        getFixtures: function(page) {
            axios.get('/fixtures/' + page).then((response) => {
                    console.log(response.data);
                    this.fixtures = response.data.games
                    this.page = page;
                    window.scrollTo(0, 0);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created: function() {
        this.getFixtures(this.page);
    }
}
const Update = {
    template: `
   <div>
       <div v-if="fixture != {}">
           <form>
               <div id="fixtureHeader" class="row">
                   <h6>Date - {{fixture.date}}</h6>
                   <h6>Location - {{fixture.location}}</h6>
                   <h6> Time - {{fixture.time}}</h6>
               </div>
               <div class="fixtureBody">
                   <div class="row">
                       <div class="col">
                           {{fixture.home.name}}
                           <div v-for="player in fixture.home.players">
                                <h3>{{player.firstName}} {{player.lastName}}</h3>
                                <div class="form-group">
                                    <label for="score">Score</label>
                                    <input type="number" class="form-control" id="score" v-model="player.score">
                                </div>
                                <div class="form-group">
                                    <label for="fouls">Fouls</label>
                                    <input type="number" class="form-control" id="fouls" v-model="player.fouls">
                                </div>
                            </div>
                            Home Score : {{homeScore}}
                        </div>
                        <div class="col">
                            {{fixture.away.name}}
                            <div v-for="player in fixture.away.players">
                                <h3>{{player.firstName}} {{player.lastName}}</h3>
                                <div class="form-group">
                                    <label for="score">Score</label>
                                    <input type="number" class="form-control" id="score" v-model="player.score">
                                </div>
                                <div class="form-group">
                                    <label for="fouls">Fouls</label>
                                    <input type="number" class="form-control" id="fouls" v-model="player.fouls">
                                </div>
                            </div>
                            Away Score : {{awayScore}}
                        </div>
                    </div>
                </div>
                <button v-on:click="updateFixture()">Update Fixture</button>
            </form>
            <div class="fixtureFooter">
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            fixture: {}
        }
    },
    methods: {
        getFixture: function() {
            axios.get('/fixture/' + this.$route.params.id).then((r) => {
                this.fixture = r.data.game;
                console.log(r);
            })
        },
        updateFixture: function() {
            axios.put("/fixture", this.fixture)
                .then(r => console.log(r.status))
                .catch(e => console.log(e));
        },
    },
    computed: {
        homeScore: function() {
            if (this.fixture.home == {})
                return 0;
            let tot = 0;
            console.log(this.fixture.home.players)
            for (let index in this.fixture.home.players) {
                if (!isNaN(this.fixture.home.players[index].score))
                    tot += Number(this.fixture.home.players[index].score)
            }
            this.fixture.home.score = tot;
            return tot;
        },
        awayScore: function() {
            if (this.fixture.away == {})
                return 0;
            let tot = 0;
            for (let index in this.fixture.away.players) {
                if (!isNaN(this.fixture.away.players[index].score))
                    tot += Number(this.fixture.away.players[index].score)
            }
            this.fixture.away.score = tot;
            return tot;
        }
    },
    created: function() {
        this.getFixture();
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
