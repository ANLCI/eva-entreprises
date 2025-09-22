<script setup>
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { creeEvaluation, getEvaluationParams } from './../services/evaluationService'

const router = useRouter()

const mutation = useMutation({
  mutationFn: () => creeEvaluation(getEvaluationParams()),
  onSuccess: () => {
    router.push('/form')
  }
})

const commencer = () => {
  // Déclenche l'appel API lorsque le bouton est cliqué
  mutation.mutate()
}
</script>

<template>
  <div class="fr-container">
    <DsfrButton
      label="Commencer"
      @click="commencer"
      primary
      :disabled="mutation.isLoading"
    />
  </div>
</template>

<style>
</style>

