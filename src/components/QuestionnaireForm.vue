<script setup>
import { ref, computed, watch, onMounted, defineProps, defineEmits } from 'vue'
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
import { determineQuestionInputType } from '../utils/questionInputType'

import { useEvaluationStore } from './../stores/evaluationStore'
import { useAlertStore } from '../stores/alertStore'

import QuestionInput from './QuestionInput.vue'

const props = defineProps(['situation', 'canPrevSituation', 'initialQuestionIndex'])

const router = useRouter()
const evaluationStore = useEvaluationStore()

const situation = computed(() => props.situation)
const initialQuestionIndexProp = computed(() => {
  const value = props.initialQuestionIndex
  if (value === undefined || value === null || value === '') {
    return 0
  }
  const parsed = Number(value)
  return Number.isNaN(parsed) ? 0 : parsed
})
const canPrevSituation = computed(() => props.canPrevSituation)
const nomTechniqueSituation = computed(() => situation.value?.nom_technique)

const questions = computed(() => situation.value?.questions)

watch(
  () => evaluationStore.evaluationId,
  (newVal) => {
    if (newVal === null) {
      router.push('/')
    }
  },
  { immediate: true },
)

const emit = defineEmits(['updateCurrentQuestion'])

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
  return questions.value ? questions.value[currentQuestionIndex.value] : null
})
const currentQuestionInputType = computed(() => {
  return determineQuestionInputType(currentQuestion.value)
})

const selectedAnswer = computed({
  get: () => {
    return answers.value[currentQuestion.value?.nom_technique] || null
  },
  set: (value) => {
    answers.value[currentQuestion.value.nom_technique] = value
  },
})
const afficheBoutonSuivant = computed(() => {
  return currentQuestionInputType.value !== 'radio' || selectedAnswer.value !== null
})

const nextQuestion = async () => {
  isLoading.value = true

  try {
    await enregistreEvenementReponse()

    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
    } else {
      await enregistreEvenementFinSituation()
      emit('finSituation')
    }
  } finally {
    isLoading.value = false
  }
}

const enregistreEvenementDemarrage = async () => {
  const evenementParams = getEvenementDemarrageParams(nomTechniqueSituation.value)
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementAffichageQuestion = async (question) => {
  const evenementParams = getEvenementAffichageQuestionParams(question, nomTechniqueSituation.value)
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementReponse = async () => {
  const evenementParams = getEvenementResponseParams(
    situation.value,
    currentQuestion.value.nom_technique,
    selectedAnswer.value,
  )
  return mutation.mutateAsync(evenementParams)
}

const enregistreEvenementFinSituation = async () => {
  const evenementParams = getEvenementFinSituationParams(nomTechniqueSituation.value)
  return mutation.mutateAsync(evenementParams)
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  } else {
    emit('prevSituation')
  }
}

const labelBoutonSuivant = computed(() => {
  if (currentQuestionIndex.value === questions.value.length - 1) {
    return 'Valider'
  } else {
    return 'Continuer'
  }
})

watch(currentQuestion, (newQuestion) => {
  if (newQuestion) {
    emit('updateCurrentQuestion', newQuestion)
    enregistreEvenementAffichageQuestion(newQuestion)
  }
})

// Réinitialise l'état quand la situation ou l'index initial change
watch(
  [situation, initialQuestionIndexProp],
  ([newSituation, initialIndex]) => {
    if (newSituation) {
      const questionsCount = newSituation.questions?.length ?? 0
      if (initialIndex === -1 && questionsCount > 0) {
        currentQuestionIndex.value = questionsCount - 1
      } else if (initialIndex >= 0 && initialIndex < questionsCount) {
        currentQuestionIndex.value = initialIndex
      } else {
        currentQuestionIndex.value = 0
      }
      answers.value = {}
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (currentQuestionIndex.value === 0 && situation.value) {
    enregistreEvenementDemarrage()
  }
})
</script>

<template>
  <div class="questionnaire-form">
    <div v-if="questions" class="questionnaire-container">
      <ProgressBar :current-value="currentQuestionIndex + 1" :max-value="questions.length" />

      <Transition name="question-slide" mode="out-in">
        <div v-if="currentQuestion" :key="currentQuestion.nom_technique" class="questionnaire">
          <DsfrButton
            :disabled="!canPrevSituation && currentQuestionIndex === 0"
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
            @prev-question="prevQuestion"
            @next-question="nextQuestion"
          />

          <DsfrButton
            v-if="afficheBoutonSuivant"
            :label="labelBoutonSuivant"
            @click="nextQuestion"
            primary
            :disabled="selectedAnswer === null || isLoading"
          />
        </div>
      </Transition>
    </div>
    <div v-else>
      <DsfrAlert type="warning" title="Pas de question disponible" />
    </div>
  </div>
</template>

<style>
.questionnaire-form {
  width: 100%;
}

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
  padding: 0 3rem;
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

.question-slide-enter-active,
.question-slide-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

.question-slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.question-slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.fr-fieldset,
.fr-select-group,
.fr-input-group {
  max-width: 620px;
}

@media screen and (max-width: 768px) {
  .questionnaire-container {
    gap: 1.5rem;
  }

  .questionnaire {
    padding: 0 1rem;
    gap: 1.5rem;
  }
}
</style>
