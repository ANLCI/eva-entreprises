<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { commenceNouvelleEvaluation } from './../services/evaluationService';
import { useAlertStore } from '../stores/alertStore';

const router = useRouter();
const isLoading = ref(false);

const alertStore = useAlertStore();

const commencer = async () => {
  isLoading.value = true;
  alertStore.hideAlert();

  try {
    await commenceNouvelleEvaluation();
    router.push('/form');
  } catch (err) {
    console.error("Erreur de création d'évaluation :", err);
    alertStore.showAlert({
      title: "Erreur de création d'évaluation",
      description: err.message,
      type: 'error'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fr-container">
    <DsfrButton label="Commencer" @click="commencer" primary :disabled="isLoading" />
  </div>
</template>
