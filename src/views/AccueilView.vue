<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  commenceNouvelleEvaluation,
  recupereSituationCourante,
} from './../services/evaluationService'
import { useAlertStore } from '../stores/alertStore'

const router = useRouter()
const isLoading = ref(false)

const alertStore = useAlertStore()
const route = useRoute()

const codeCampagne = route.query.code ?? import.meta.env.VITE_CODE_CAMPAGNE_EVA_ENTREPRISES
const beneficiaireId =
  route.query.beneficiaire_id ?? import.meta.env.VITE_ID_BENEFICIAIRE_EVA_ENTREPRISES

const commencer = async () => {
  isLoading.value = true
  alertStore.hideAlert()

  try {
    await commenceNouvelleEvaluation(codeCampagne, beneficiaireId)
    const situation = await recupereSituationCourante()
    router.push(`/situations/${situation.id}`)
  } catch (err) {
    console.error("Erreur de création d'évaluation :", err)
    alertStore.showAlert({
      title: "Erreur de création d'évaluation",
      description: err.message,
      type: 'error',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fr-container">
    <DsfrButton label="Commencer" @click="commencer" primary :disabled="isLoading" />
  </div>
</template>
