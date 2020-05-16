import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
window.axios = axios;

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app') 
