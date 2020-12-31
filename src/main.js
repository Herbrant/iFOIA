import Vue from 'vue'
import App from './App.vue'
import VueFormulate from '@braid/vue-formulate'
import { it } from '@braid/vue-formulate-i18n'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueFormulate,  {
  plugins: [ it ],
  locale: 'it'
})
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
