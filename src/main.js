import './assets/main.css'

import { createApp } from 'vue'
import '@gouvfr/dsfr/dist/dsfr.min.css'
import '@captive_owner/vue-dsfr/styles'
import VueDsfr from '@captive_owner/vue-dsfr'
import { VueQueryPlugin } from '@tanstack/vue-query'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import RollbarPlugin from './rollbar'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VueDsfr)
app.use(VueQueryPlugin)
app.use(RollbarPlugin)

app.mount('#app')
