import Vue from 'vue'
import App from './App.vue'
import VueFormulate from '@braid/vue-formulate'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueFormulate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
