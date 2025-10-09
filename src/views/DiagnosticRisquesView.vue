<script setup>
import QuestionnaireForm from './../components/QuestionnaireForm.vue'

const idQuestionnaireEvaEntreprises = import.meta.env.VITE_ID_QUESTIONNAIRE_EVA_ENTREPRISES
const situation = import.meta.env.VITE_NOM_TECHNIQUE_SITUATION_EVA_ENTREPRISES
</script>

<template>
  <QuestionnaireForm :questionnaire-id="idQuestionnaireEvaEntreprises" :situation="situation" />
</template>
