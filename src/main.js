import { createApp } from 'vue'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap/dist/css/bootstrap.min.css"

createApp(App).use(store).use(router).use(BootstrapVue3).mount('#app')
