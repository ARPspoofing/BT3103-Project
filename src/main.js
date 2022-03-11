import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

createApp(App).use(store).use(router).use(BootstrapVue3).mount('#app')
