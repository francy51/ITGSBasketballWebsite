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

const UpdateList = {
    template: `
        <div>
            <div v-if="fixtures.length > 0">
                <h2 class="text-center"> Fixtures </h2>
                <div v-for='game in fixtures'>
                    <game-tab v-bind:game='game' ></game-tab>
                    <router-link class="nav-link" :to="/update/ + game._id">
                        <btn>
                            Update this fixture
                        </btn>
                    </router-link>
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
            axios.put("/admin/fixture", this.fixture)
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
