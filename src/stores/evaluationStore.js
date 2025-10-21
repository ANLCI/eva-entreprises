import { defineStore } from 'pinia'

export const useEvaluationStore = defineStore('evaluation', {
  state: () => ({
    evaluationId: null,
    codeSituationCourante: null,
  }),
  actions: {
    setEvaluationId(id) {
      this.evaluationId = id
    },
  },
})
