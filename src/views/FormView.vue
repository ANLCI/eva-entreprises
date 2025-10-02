<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import EvaSpinner from './../components/EvaSpinner.vue'
import { useEvaluationStore } from './../stores/evaluationStore'
import { fetchQuestionnaire } from './../services/questionnaireService'
import {
  creeEvenement,
  getEvenementDemarrageParams,
  getEvenementResponseParams,
  getEvenementFinSituationParams,
  getEvenementAffichageQuestionParams,
} from './../services/evenementService'
import QuestionInput from './../components/QuestionInput.vue'
import { useAlertStore } from '../stores/alertStore'

const router = useRouter()
const evaluationStore = useEvaluationStore()
const evaluationId = evaluationStore.evaluationId
const evaluationUrl = `${import.meta.env.VITE_API_BASE_URL}/evaluations/${evaluationId}`
const alertStore = useAlertStore()

watch(
  () => evaluationStore.evaluationId,
  (newVal) => {
    if (newVal === null) {
      router.push('/')
    }
  },
  { immediate: true },
)

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

const idQuestionnaireEvaEntreprises = import.meta.env.VITE_ID_QUESTIONNAIRE_EVA_ENTREPRISES
const { data, isFetching } = useQuery({
  queryKey: ['repoData'],
  queryFn: () => fetchQuestionnaire(idQuestionnaireEvaEntreprises),
})

const currentQuestionIndex = ref(0)
const answers = ref({})
const isLoading = ref(false)

const currentQuestion = computed(() => {
  return data && data.value ? data.value[currentQuestionIndex.value] : null
})

const selectedAnswer = computed({
  get: () => {
    return answers.value[currentQuestion.value?.nom_technique] || null
  },
  set: (value) => {
    answers.value[currentQuestion.value.nom_technique] = value
  },
})

const nextQuestion = async () => {
  isLoading.value = true

  try {
    await enregistreEvenementReponse()

    if (currentQuestionIndex.value < data.value.length - 1) {
      currentQuestionIndex.value++
    } else {
      await enregistreEvenementFinSituation()
      window.location.href = evaluationUrl
    }
  } finally {
    isLoading.value = false
  }
}

const enregistreEvenementDemarrage = async () => {
  const evenementParams = getEvenementDemarrageParams()
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementAffichageQuestion = async (question) => {
  const evenementParams = getEvenementAffichageQuestionParams(question)
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementReponse = async () => {
  const evenementParams = getEvenementResponseParams(
    currentQuestion.value.nom_technique,
    selectedAnswer.value,
    currentQuestion.value.intitule,
  )
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementFinSituation = async () => {
  const evenementParams = getEvenementFinSituationParams()
  return mutation.mutateAsync(evenementParams)
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const labelBoutonSuivant = computed(() => {
  if (currentQuestionIndex.value === data.value.length - 1) {
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
    <div v-if="isFetching" class="loader">
      <EvaSpinner />
    </div>
    <div v-else-if="data">
      <div>Question {{ currentQuestionIndex + 1 }}/{{ data.length }}</div>
      <br />
      <div v-if="currentQuestion">
        <QuestionInput
          :currentQuestion="currentQuestion"
          v-model="selectedAnswer"
          :currentQuestionIndex="currentQuestionIndex"
          :labelBoutonSuivant="labelBoutonSuivant"
          @prevQuestion="prevQuestion"
          @nextQuestion="nextQuestion"
        />
        <div class="actions">
          <div>
            <DsfrButton
              v-if="currentQuestionIndex !== 0"
              label="Question précédente"
              @click="prevQuestion"
              tertiary
            />
          </div>
          <div>
            <DsfrButton
              :label="labelBoutonSuivant"
              @click="nextQuestion"
              primary
              :disabled="selectedAnswer === null || isLoading"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <DsfrAlert type="warning" title="Pas de question disponible" />
    </div>
  </div>
</template>

<style>
.actions {
  display: flex;
  justify-content: space-between;
}

.loader {
  display: flex;
  justify-content: center;
  padding: 4rem;
  width: 100%;
}
</style>
