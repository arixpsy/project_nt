<template>
    <div class="spotify">
        <div class="spotify-content" id="card">
            <div class="face front">
                <div class="header">
                    <span class="f-header header-text">Spotify Player</span>
                    <button class="f-btn header-btn" v-on:click="flipCard">
                        <font-awesome-icon icon='cog'/>
                    </button>
                </div>
                <div id="widget" class="widget"></div>
            </div>
            <div class="face back">
                <div class="header">
                    <span class="b-head header-text">Settings</span>
                    <button class="b-btn header-btn" v-on:click="flipCard">
                        <font-awesome-icon icon='cog'/>
                    </button>
                </div>
                <div class="settings">
                    <form v-on:submit="saveURI">
                        <input type="text" v-model="uri" placeholder="Spotify URI">
                    </form>
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
            urierror: false
        }
    },
    mounted(){
        this.uri = localStorage.getItem('project_nt-spotify_uri');
        if(this.uri == null || this.uri == ''){
            this.flipCard();
        }else{
            this.reloadWidget();
        }
    },
    methods: {
        reloadWidget: function(){
            //spotify:playlist:2JYgKFqYFPsEw7HreR5Uz2
            let type = this.uri.split(':')[1];
            let id = this.uri.split(':')[2];
            console.log(type + '     ' + id);
            let widget = document.getElementById('widget');
            widget.innerHTML = `<iframe src="https://open.spotify.com/embed/${type}/${id}" 
            style="border: 0; width: 100%; min-height: 380px;"
            frameborder="0" 
            allowtransparency="true" 
            allow="encrypted-media"></iframe>`;
        },
        saveURI: function (e){
            e.preventDefault();
            localStorage.setItem('project_nt-spotify_uri',this.uri);
            this.reloadWidget();
            this.flipCard();
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
    background-color: black;
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
}
.header-btn{
    padding:10px;
    transition: .2s ease-out all;
}
.f-btn{
    color: white;
}
.f-btn:hover{
    background-color:  #20C75A;
}
button{
    background: none;
    outline: none;
    border: none;
}
.settings{
    padding: 0 10px;
}
</style>



