import './assets/main.css'

import { createApp } from 'vue'
import '@gouvfr/dsfr/dist/dsfr.min.css'
import '@captive_owner/vue-dsfr/styles'
import VueDsfr from '@captive_owner/vue-dsfr'
import { VueQueryPlugin } from '@tanstack/vue-query'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import RollbarPlugin from './rollbar'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueDsfr)
app.use(VueQueryPlugin)
app.use(RollbarPlugin)

app.mount('#app')
