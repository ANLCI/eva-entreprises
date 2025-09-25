import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useEvenementStore = defineStore('evenement', {
  state: () => ({
    position: 0,
    session_id: uuidv4(),
  }),
  actions: {
    incrementePosition() {
      this.position += 1
    },
    getCurrentPosition() {
      const currentPosition = this.position
      this.incrementePosition()
      return currentPosition
    },
    resetPosition() {
      this.position = 0
    },
    resetSessionId() {
      this.session_id = uuidv4()
    }
  },
})
