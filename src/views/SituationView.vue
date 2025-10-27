<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import QuestionnaireSideMenu from './../components/QuestionnaireSideMenu.vue'
import QuestionnaireForm from './../components/QuestionnaireForm.vue'
import { useCampagneStore } from './../stores/campagneStore'

const route = useRoute()
const campagneStore = useCampagneStore()

const situation = campagneStore.getSituation(route.params.id)

const currentQuestion = ref(null)

const setCurrentQuestion = (question) => {
  currentQuestion.value = question
}
</script>

<template>
  <div class="page-situation" v-if="situation">
    <QuestionnaireSideMenu class="side-menu" :current-question="currentQuestion" />
    <QuestionnaireForm :situation="situation" @updateCurrentQuestion="setCurrentQuestion" />
  </div>
</template>

<style scoped>
.page-situation {
  display: flex;
}

.side-menu {
  min-width: 440px;
}

.form {
  flex-grow: 1;
}

@media screen and (max-width: 768px) {
  .page-situation {
    flex-direction: column;
  }

  .side-menu {
    min-width: auto;
  }
}
</style>
