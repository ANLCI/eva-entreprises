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
      path: '/diagnostic-risques',
      name: 'Diagnostic Risques',
      component: () => import('../views/DiagnosticRisquesView.vue'),
    },
    {
      path: '/evaluation-impact',
      name: 'Evaluation Impact',
      component: () => import('../views/EvaluationImpactView.vue'),
    },
  ],
})

export default router
