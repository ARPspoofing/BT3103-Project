import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
import Multiselect from 'vue-multiselect'


createApp(App)
.use(store)
.use(router)
.use(BootstrapVue3)
.mount('#app')
.component('font-awesome-icon', FontAwesomeIcon)
.component('multiselect', Multiselect)
