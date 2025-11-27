import { defineStore } from 'pinia'

export const useCampagneStore = defineStore('campagne', {
  state: () => ({
    libelle: null,
    code: null,
    situations: null,
    codeSituationCourante: null,
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
    setCodeSituationCourante(codeSituation) {
      this.codeSituationCourante = codeSituation
    },
    getCampagne() {
      if (!this.libelle || !this.code || !this.situations) return null

      return {
        libelle: this.libelle,
        code: this.code,
        situations: this.situations,
      }
    },
    getSituationCourante(codeSituation) {
      if (this.situations == null) return

      const situation = this.situations.find((s) => s.code === codeSituation)

      return situation ? situation : this.situations[0]
    },
    getSituation(situationId) {
      if (this.situations == null) return

      return this.situations.find((s) => s.id === situationId)
    },
    getSituations() {
      return this.situations
    },
    getSituationIndex(situation) {
      if (this.situations == null) return

      return this.situations.findIndex((s) => s.id === situation.id)
    },
    getSituationSuivante(situation) {
      const index = this.getSituationIndex(situation)

      if (index === null || index < 0 || index >= this.situations.length - 1) return null

      return this.situations[index + 1]
    },
    getSituationPrecedente(situation) {
      const index = this.getSituationIndex(situation)

      if (index === null || index < 0 || index >= this.situations.length - 1) return null
      return this.situations[index - 1]
    },
  },
})
