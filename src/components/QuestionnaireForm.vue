<script setup>
import { ref, computed, watch, onMounted, defineProps } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

import {
  creeEvenement,
  getEvenementDemarrageParams,
  getEvenementResponseParams,
  getEvenementFinSituationParams,
  getEvenementAffichageQuestionParams,
} from './../services/evenementService'

import ProgressBar from './../components/ProgressBar.vue'

import { useEvaluationStore } from './../stores/evaluationStore'
import { useAlertStore } from '../stores/alertStore'

import QuestionInput from './QuestionInput.vue'

const props = defineProps(['situation'])

const router = useRouter()
const evaluationStore = useEvaluationStore()
const evaluationId = evaluationStore.evaluationId

const situation = props.situation
const nomTechniqueSituation = situation.nom_technique

const questions = situation.questions

watch(
  () => evaluationStore.evaluationId,
  (newVal) => {
    if (newVal === null) {
      router.push('/')
    }
  },
  { immediate: true },
)

const evaluationUrl = `${import.meta.env.VITE_ADMIN_BASE_URL}/evaluations/${evaluationId}`
const alertStore = useAlertStore()

const mutation = useMutation({
  mutationFn: (eventParams) => creeEvenement(eventParams),
  onError: (err) => {
    console.error("Erreur lors de la création de l'évènement :", err)
    alertStore.showAlert({
      title: "Erreur lors de la création de l'évènement",
      description: err.message,
      type: 'error',
    })
  },
})

const currentQuestionIndex = ref(0)
const answers = ref({})
const isLoading = ref(false)

const currentQuestion = computed(() => {
  return questions ? questions[currentQuestionIndex.value] : null
})

const selectedAnswer = computed({
  get: () => {
    return answers.value[currentQuestion.value?.nom_technique] || null
  },
  set: (value) => {
    answers.value[currentQuestion.value.nom_technique] = value
  },
})

/**
 * Attend 500 millisecondes avant de rediriger pour que le serveur puisse calculer les résultats avant de l'afficher à l'utilisateur
 */
const redirigeVersEvaluation = () => {
  setTimeout(() => {
    window.location.href = evaluationUrl
  }, 500)
}

const nextQuestion = async () => {
  isLoading.value = true

  try {
    await enregistreEvenementReponse()

    if (currentQuestionIndex.value < questions.length - 1) {
      currentQuestionIndex.value++
    } else {
      await enregistreEvenementFinSituation()
      redirigeVersEvaluation()
    }
  } finally {
    isLoading.value = false
  }
}

const enregistreEvenementDemarrage = async () => {
  const evenementParams = getEvenementDemarrageParams(nomTechniqueSituation)
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementAffichageQuestion = async (question) => {
  const evenementParams = getEvenementAffichageQuestionParams(question, nomTechniqueSituation)
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementReponse = async () => {
  const evenementParams = getEvenementResponseParams(
    situation,
    currentQuestion.value.nom_technique,
    selectedAnswer.value,
    currentQuestion.value.intitule,
  )
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementFinSituation = async () => {
  const evenementParams = getEvenementFinSituationParams(nomTechniqueSituation)
  return mutation.mutateAsync(evenementParams)
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const labelBoutonSuivant = computed(() => {
  if (currentQuestionIndex.value === questions.length - 1) {
    return 'Valider'
  } else {
    return 'Continuer'
  }
})

watch(currentQuestion, (newQuestion) => {
  if (newQuestion) {
    enregistreEvenementAffichageQuestion(newQuestion)
  }
})

onMounted(() => {
  if (currentQuestionIndex.value === 0) {
    enregistreEvenementDemarrage()
  }
})
</script>

<template>
  <div class="fr-container">
    <div v-if="questions" class="questionnaire-container">
      <ProgressBar :current-value="currentQuestionIndex + 1" :max-value="questions.length" />

      <div v-if="currentQuestion" class="questionnaire">
        <DsfrButton
          :disabled="currentQuestionIndex === 0"
          label="< Précédent"
          @click="prevQuestion"
          tertiary
          no-outline
          class="questionnaire__bouton-precedent"
        />

        <QuestionInput
          :currentQuestion="currentQuestion"
          v-model="selectedAnswer"
          :currentQuestionIndex="currentQuestionIndex"
          :labelBoutonSuivant="labelBoutonSuivant"
          @prevQuestion="prevQuestion"
          @nextQuestion="nextQuestion"
        />

        <DsfrButton
          :label="labelBoutonSuivant"
          @click="nextQuestion"
          primary
          :disabled="selectedAnswer === null || isLoading"
        />
      </div>
      <div v-else>
        <DsfrAlert type="warning" title="Pas de question disponible" />
      </div>
    </div>
  </div>
</template>

<style>
.questionnaire-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 3rem;
}

.questionnaire {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.questionnaire .fr-fieldset {
  margin-bottom: 0;
}

.questionnaire .fr-fieldset .fr-fieldset__element:last-child {
  margin-bottom: 0;
}

.questionnaire__bouton-precedent {
  margin-left: -1rem;
}
</style>
