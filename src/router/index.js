import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: AccueilView,
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue'),
    },
    {
      path: '/resultat',
      name: 'resultat',
      component: () => import('../views/ResultatView.vue'),
    },
  ],
})

export default router
