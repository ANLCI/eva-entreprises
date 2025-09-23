<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { commenceNouvelleEvaluation } from './../services/evaluationService'

const router = useRouter()
const isLoading = ref(false)

const commencer = async () => {
  isLoading.value = true;

  try {
    await commenceNouvelleEvaluation();
    router.push('/form');
  } catch (error) {
    console.error("Erreur de création d'évaluation :", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="fr-container">
    <DsfrButton
      label="Commencer"
      @click="commencer"
      primary
      :disabled="isLoading"
    />
  </div>
</template>

<style>
</style>

