import './assets/main.css'

import { createApp } from 'vue'
import '@gouvfr/dsfr/dist/dsfr.min.css' // Import des styles du DSFR //
import '@gouvminint/vue-dsfr/styles' // Import des styles globaux propre à VueDSFR //
import VueDsfr from '@gouvminint/vue-dsfr' // Import (par défaut) de la bibliothèque //
import { VueQueryPlugin } from '@tanstack/vue-query'

import { createPinia } from 'pinia'
import RollbarPlugin from './services/rollbar';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueDsfr)
app.use(VueQueryPlugin)
app.use(RollbarPlugin);

app.mount('#app')
