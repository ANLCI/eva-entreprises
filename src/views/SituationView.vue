<script setup>
import { useRoute } from 'vue-router'

import QuestionnaireForm from './../components/QuestionnaireForm.vue'
import { useCampagneStore } from './../stores/campagneStore'

const route = useRoute()
const campagneStore = useCampagneStore()

const situation = campagneStore.getSituation(route.params.id)
</script>

<template>
  <QuestionnaireForm v-if="situation" :situation="situation" />
</template>
