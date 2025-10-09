<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import QuestionnaireForm from './../components/QuestionnaireForm.vue'

import { useEvaluationStore } from './../stores/evaluationStore'

const idQuestionnaireEvaEntreprises = import.meta.env.VITE_ID_QUESTIONNAIRE_EVALUATION_IMPACT
const situation = import.meta.env.VITE_NOM_TECHNIQUE_SITUATION_EVALUATION_IMPACT
const route = useRoute()

const dataEstPrete = ref(false)

const assigneEvaluationIdDepuisParametre = () => {
  const evaluationStore = useEvaluationStore()
  const evaluationId = route.query.evaluation_id
  evaluationStore.setEvaluationId(evaluationId)
}

onMounted(async () => {
  assigneEvaluationIdDepuisParametre()

  dataEstPrete.value = true
})
</script>

<template>
  <QuestionnaireForm
    v-if="dataEstPrete"
    :questionnaire-id="idQuestionnaireEvaEntreprises"
    :situation="situation"
  />
</template>
