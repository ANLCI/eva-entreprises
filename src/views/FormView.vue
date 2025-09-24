<script setup>
import { ref, computed, watch } from 'vue'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import EvaSpinner from './../components/EvaSpinner.vue'
import { useEvaluationStore } from './../stores/evaluationStore'
import { fetchQuestionnaire } from './../services/questionnaireService'
import { creeEvenement, getEvenementParams } from './../services/evenementService'
import QuestionInput from './../components/QuestionInput.vue'

const router = useRouter()
const evaluationStore = useEvaluationStore()

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
  onError: (error) => {
    console.error("Erreur lors de la création de l'évènement:", error)
  },
})

const idQuestionnaireEvaEntreprises = import.meta.env.VITE_ID_QUESTIONNAIRE_EVA_ENTREPRISES
const { data, error, isFetching } = useQuery({
  queryKey: ['repoData'],
  queryFn: () => fetchQuestionnaire(idQuestionnaireEvaEntreprises),
})

const currentQuestionIndex = ref(0)
const answers = ref({})

const currentQuestion = computed(() => {
  return data ? data.value[currentQuestionIndex.value] : null
})

const selectedAnswer = computed({
  get: () => {
    return answers.value[currentQuestion.value?.nom_technique] || null
  },
  set: (value) => {
    answers.value[currentQuestion.value.nom_technique] = value
  },
})

const nextQuestion = () => {
  enregistreEvenement()

  if (currentQuestionIndex.value < data.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    router.push('/resultat')
  }
}

const enregistreEvenement = () => {
  const evenementParams = getEvenementParams(
    currentQuestion.value.nom_technique,
    selectedAnswer.value,
    currentQuestion.value.intitule,
  )
  mutation.mutate(evenementParams)
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
</script>

<template>
  <div class="fr-container">
    <div v-if="isFetching" class="loader">
      <EvaSpinner />
    </div>
    <div v-else-if="error">
      <DsfrAlert
        type="error"
        title="Une erreur est survenue lors de la récupération des questions"
        :description="error.message"
      />
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
              :disabled="selectedAnswer === null"
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
