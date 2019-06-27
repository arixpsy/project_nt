import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faGlobeAsia, faLocationArrow, faCloud, faWind, faTint, faThermometerHalf, faCross, faTimes, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faGlobeAsia,faLocationArrow,faCloud,faWind,faTint,faThermometerHalf,faTimes,faCog)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
