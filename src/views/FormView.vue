<script setup>
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import EvaSpinner from './../components/EvaSpinner.vue'
import { fetchQuestionnaire } from './../services/questionnaireService'

const router = useRouter()

const idQuestionnaireEvaEntreprises = import.meta.env.VITE_ID_QUESTIONNAIRE_EVA_ENTREPRISES;
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
  }
})

const nextQuestion = () => {
  if (currentQuestionIndex.value < data.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    router.push('/resultat')
  }
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const options = computed(() => {
  if (currentQuestion.value && currentQuestion.value.choix) {
    return currentQuestion.value.choix.map((choix) => ({
      label: choix.intitule,
      id: choix.nom_technique,
      value: choix.nom_technique,
      hint: null,
    }))
  }
  return []
})

const labelBoutonSuivant = computed(() => {
  if (currentQuestionIndex.value === data.length - 1) {
    return 'Valider'
  } else {
    return 'Continuer'
  }
})
</script>

<template>
  <div class="fr-container ">
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
      <br>
      <div v-if="currentQuestion">
        <DsfrRadioButtonSet
          v-model="selectedAnswer"
          :legend="currentQuestion.intitule"
          :options="options"
          name="currentQuestion.nom_technique"
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
      <DsfrAlert
        type="warning"
        title="Pas de question disponible"
      />
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
