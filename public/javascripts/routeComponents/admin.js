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
