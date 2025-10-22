<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import EvaSpinner from './../components/EvaSpinner.vue'

import { useEvaluationStore } from './../stores/evaluationStore'
import { recupereEvaluation } from './../services/evaluationService'
import { recupereCampagne } from './../services/campagneService'

const route = useRoute()
const router = useRouter()

const assigneEvaluationIdDepuisParametre = async () => {
  const evaluationStore = useEvaluationStore()
  const evaluationId = route.query.evaluation_id
  evaluationStore.setEvaluationId(evaluationId)

  const evaluation = await recupereEvaluation(evaluationId)
  const campagne = await recupereCampagne(evaluation.campagne_id)

  const situation = campagne.situations.find((situation) =>
    situation.nom_technique.includes('impact'),
  )
  router.push(`/situations/${situation.id}`)
}

onMounted(async () => {
  assigneEvaluationIdDepuisParametre()
})
</script>

<template>
  <EvaSpinner></EvaSpinner>
</template>
