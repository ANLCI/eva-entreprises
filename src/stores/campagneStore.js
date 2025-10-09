import { defineStore } from 'pinia'

export const useCampagneStore = defineStore('campagne', {
  state: () => ({
    libelle: null,
    code: null,
    situations: null,
  }),
  actions: {
    setLibelle(libelle) {
      this.libelle = libelle
    },
    setCode(code) {
      this.code = code
    },
    setSituations(situations) {
      this.situations = situations
    },
    getCampagne() {
      if (!this.libelle || !this.code || !this.situations) return null

      return {
        libelle: this.libelle,
        code: this.code,
        situations: this.situations,
      }
    },
  },
})
