<template>
  <div id="app">
    <!--<div class="video-bg color-overlay"></div>
    <video autoplay muted loop id="video-bg">
      <source src="./assets/shootingstar.mp4" type="video/mp4">
    </video>-->
    <main class="container">
      <Clock />
      <Weather />
      <TodoApp />
    </main>
  </div>
</template>
<script>
import Clock from './components/Clock.vue'
import Weather from './components/Weather.vue'
//import Fill from './components/Fill.vue'
import TodoApp from './components/TodoApp'

export default {
  name: 'app',
  components: {
    Clock,
    Weather,
    TodoApp
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
body{
  margin: 0 0;
  padding: 0 0;
}
p {
  padding: 0 0;
  margin: 0 0;
}
#app{
  background-image: linear-gradient(to top right, #333C64, #41486F);
}
.container{
  margin: auto;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, auto);
  overflow-y: scroll;
}

#video-bg { 
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  transform: translate(-50%, -50%);
}
.color-overlay{
  position: absolute;
  background-color: black;
  opacity: 0.8;
  z-index: -50;
  height: 100vh;
  width: 100vw;
}

@media screen and (max-width: 1025px) {
  .container{
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (max-width: 850px) {
  .container{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 625px) {
  .container{
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
