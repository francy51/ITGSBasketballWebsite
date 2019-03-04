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

const PlayedGames = {
    template: `
        <div>
            <div v-if="played.length > 0">
                <h2 class="text-center"> Games played </h2>
                    <div class='row well text-center'>
        <div class="col row">
            <div class='col'>            </div>
            <div class='col'>
                <h3>Home</h3>
            </div>
            <div class='col'>
                <h3>Score</h3>
            </div>
        </div>
        <div class='col'>
            <h1> VS </h1>
        </div>
        <div class="col row">
            <div class='col'>
                <h3>Score</h3>
            </div>
            <div class='col-xl'>
                <h3>Away</h3>
            </div>
            <div class='col'>
                <img v-bind:src="urlAway" class="img-fluid" />
            </div>
        </div>
    </div>
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
