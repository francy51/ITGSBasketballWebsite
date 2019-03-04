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
        <div class="col row">
            <div class='col'>
                <img v-bind:src="urlHome" class="img-fluid" />
            </div>
            <div class='col'>
                <h3>{{game.home.name}}</h3>
            </div>
            <div class='col'>
                <h3>{{game.home.score}}</h3>
            </div>
        </div>
        <div class='col'>
            <h1> VS </h1>
        </div>
        <div class="col row">
            <div class='col'>
                <h3>{{game.away.score}}</h3>
            </div>
            <div class='col-xl'>
                <h3>{{game.away.name}}</h3>
            </div>
            <div class='col'>
                <img v-bind:src="urlAway" class="img-fluid" />
            </div>
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
