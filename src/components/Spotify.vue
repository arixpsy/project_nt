<template>
    <div class="spotify">
        <div class="spotify-content" id="card">
            <!-- Front Face of the widget -->
            <div class="face front">
                <div class="header">
                    <span class="f-header header-text">Spotify Player</span>
                    <button class="f-btn header-btn" v-on:click="flipCard">
                        <font-awesome-icon icon='cog'/>
                    </button>
                </div>
                <div id="widget" class="widget"></div>
            </div>
            <!-- Back Face of the widget -->
            <div class="face back">
                <div class="header">
                    <span class="b-head header-text">Settings</span>
                    <button class="b-btn header-btn" v-on:click="flipCard">
                        <font-awesome-icon icon='cog'/>
                    </button>
                </div>
                <div class="settings">
                    <div class="settings-label">Spotify URI:</div>
                    <form v-on:submit="saveURI">
                        <input type="text" v-model="uri" placeholder="Spotify URI">
                    </form>
                    <div class="error-label" v-if="uriError">- Invalid URI -</div>
                    <div class="settings-label">Spotify Login:</div>
                    <div class="spotify-welcome" v-if="loggedIn">
                        You are currently logged in as {{user}}
                    </div>
                    <div class="spotify-login" v-else>
                        <form v-on:submit="spotifyLogin">
                            <input type="text" v-model="login_id" placeholder="Email/Username">
                            <input type="password" v-model="login_password" placeholder="Password">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    name: 'spotify',
    data(){
        return {
            uri: '',
            uriError: false,
            loggedIn: false,
            login_id: '',
            login_password: '',
            user: 'Arix'
        }
    },
    created(){
        //user details ng-binding
        let URL = 'https://accounts.spotify.com/en/login'
        fetch(URL,{
            method:'GET',
            header:{ 
                "Access-Control-Allow-Origin": "http://localhost:8080"
                
        },credentials: "same-origin"
        
        }).then((response)=>{
            return response.text();
        }).then((data)=>{
            console.log(data);
        })
    },
    mounted(){
        this.uri = localStorage.getItem('project_nt-spotify_uri');
        if(this.uri == null || this.uri == ''){
            this.flipCard();
        }else{
            this.reloadWidget();
        }
    },
    watch: {
        uri: function (){
            let regexChk = /spotify:(artist|album|playlist|track):\w+/g;
            if(regexChk.test(this.uri)){
                this.uriError = false;
            }else{
                this.uriError = true;
            }
        }
    },
    methods: {
        spotifyLogin: function(){

        },
        reloadWidget: function(){
            //spotify:playlist:2JYgKFqYFPsEw7HreR5Uz2
            let type = this.uri.split(':')[1];
            let id = this.uri.split(':')[2];
            let widget = document.getElementById('widget');
            widget.innerHTML = `<iframe src="https://open.spotify.com/embed/${type}/${id}" 
            style="border: 0; width: 100%; min-height: 380px;"
            frameborder="0" 
            allowtransparency="true" 
            allow="encrypted-media"></iframe>`;
        },
        saveURI: function (e){
            e.preventDefault();
            if(!this.uriError){
                localStorage.setItem('project_nt-spotify_uri',this.uri);
                this.reloadWidget();
                this.flipCard();
            }
        },
        flipCard: function(){
            let card = document.getElementById('card');
            if(card.classList.contains('flipped')){
                card.classList.remove('flipped')
            }else{
                card.classList.add('flipped');
            }
        }
    }
        
}
</script>
<style scoped>
.spotify{
    position: relative;
    perspective: 1000px;
    overflow: hidden;
    font-family: monospace;
}
.widget {
    position: relative;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    height: auto;
}
.widget iframe,
.widget object,
.widget embed {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
input{
    width:100%;
    font-size: 10px;
    font-family: monospace;
    border: none;
    background-color: white;
    border-radius: 25px;
    padding: 5px 15px;
}
input:focus{
    outline: none;
    box-shadow: 0px 0px 1px 1px WHITESMOKE;
}
input:hover{
    box-shadow: 0px 0px 1px 1px WHITESMOKE;
}
.spotify-content {
    width: 100%;
    height: 100%;
	-webkit-transform-style: preserve-3d;
	transform-style: preserve-3d;
    -webkit-transition: 0.5s;
    transition: 0.5s;
}
.face{
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}
.front{
    background-color: #191414;
    z-index: 2;
    color: white;
}
.back{
    background-image: linear-gradient(to top right, #1DB954, #20C75A);
    transform: rotateY(-180deg);
}
.flipped{
    -webkit-transform: rotateY(-180deg);
	transform: rotateY(-180deg);
}
.header{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    font-family: monospace;
}
.header-text{
    padding: 10px;
    font-size: 20px;
    color: white;
}
.header-btn{
    padding:10px;
    color: white;
    transition: .2s ease-out all;
}
.f-btn:hover{
    background-color:  #1DB954;
}
.b-btn:hover{
    background-color:  #191414;
}
button{
    background: none;
    outline: none;
    border: none;
}
.settings{
    padding: 0 10px;
    background-color: #191414;
    height: 100%;
    color: white;
}
.settings-label{
    padding: 15px 0px 5px 0px;
}
.error-label{
    text-align: center;
    font-size: 10px;
    color: crimson;
}
</style>



