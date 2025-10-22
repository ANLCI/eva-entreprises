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
      path: '/evaluation-impact',
      name: 'Evaluation Impact',
      component: () => import('../views/EvaluationImpactView.vue'),
    },
    {
      path: '/situations/:id',
      name: 'Situation',
      component: () => import('../views/SituationView.vue'),
    },
  ],
})

export default router
