import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    isVisible: false,
    type: 'error',
    title: '',
    description: '',
  }),
  actions: {
    showAlert({ title, description, type = 'error' }) {
      this.isVisible = true
      this.type = type
      this.title = title
      this.description = description
    },
    hideAlert() {
      this.isVisible = false
      this.title = ''
      this.description = ''
    },
  },
})
