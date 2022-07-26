import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Toasted from 'vue-toasted'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionAPI from '@vue/composition-api'



Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(Toasted, { router })
Vue.use(Element)
Vue.use(VueCompositionAPI)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
