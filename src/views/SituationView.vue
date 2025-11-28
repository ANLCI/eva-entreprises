<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import QuestionnaireSideMenu from './../components/QuestionnaireSideMenu.vue'
import QuestionnaireForm from './../components/QuestionnaireForm.vue'
import { useCampagneStore } from './../stores/campagneStore'
import { useEvaluationStore } from './../stores/evaluationStore'
import { useEvenementStore } from './../stores/evenementStore'

const route = useRoute()
const router = useRouter()
const campagneStore = useCampagneStore()
const evaluationStore = useEvaluationStore()
const evenementStore = useEvenementStore()

let situation = computed(() => {
  if (route.params.id) {
    return campagneStore.getSituation(route.params.id)
  } else {
    return campagneStore.getSituationCourante(evaluationStore.codeSituationCourante)
  }
})

const currentQuestion = ref(null)
const initialQuestionIndex = computed(() => {
  const value = route.query['question-index']
  if (value === undefined || value === null || value === '') {
    return 0
  }
  const parsed = Number(value)
  return Number.isNaN(parsed) ? 0 : parsed
})

const evaluationId = evaluationStore.evaluationId
const evaluationUrl = `${import.meta.env.VITE_ADMIN_BASE_URL}/evaluations/${evaluationId}`

/**
 * Attend 500 millisecondes avant de rediriger pour que le serveur puisse calculer les résultats avant de l'afficher à l'utilisateur
 */
const redirigeVersEvaluation = () => {
  setTimeout(() => {
    window.location.href = evaluationUrl
  }, 500)
}

/*
 * Redirige vers l'évaluation si c'est la dernière situation
 * Assigne la situation suivante comme situation courante
 */
const finSituation = () => {
  const nextSituation = campagneStore.getSituationSuivante(situation.value)
  if (nextSituation) {
    campagneStore.setCodeSituationCourante(nextSituation.code)
    evenementStore.resetPosition()
    evenementStore.resetSessionId()
    router.push(`/situations/${nextSituation.id}`)
  } else {
    redirigeVersEvaluation()
  }
}

const setCurrentQuestion = (question) => {
  currentQuestion.value = question
}

const prevSituation = () => {
  const previousSituation = campagneStore.getSituationPrecedente(situation.value)
  router.push({
    path: `/situations/${previousSituation.id}`,
    query: { 'question-index': -1 },
  })
}
</script>

<template>
  <div class="page-situation" v-if="situation">
    <QuestionnaireSideMenu class="side-menu" :current-question="currentQuestion" />
    <QuestionnaireForm
      :situation="situation"
      :initial-question-index="initialQuestionIndex"
      @updateCurrentQuestion="setCurrentQuestion"
      @prevSituation="prevSituation"
      @finSituation="finSituation"
    />
  </div>
</template>

<style scoped>
.page-situation {
  display: flex;
}

.side-menu {
  min-width: 440px;
}

.form {
  flex-grow: 1;
}

@media screen and (max-width: 768px) {
  .page-situation {
    flex-direction: column;
  }

  .side-menu {
    min-width: auto;
  }
}
</style>
