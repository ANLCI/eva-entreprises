<template>
  <div class="progress-bar">
    <div
      class="progress-bar-fill"
      :style="{ width: progressPercentage }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentValue: {
    type: Number,
    required: true
  },
  maxValue: {
    type: Number,
    required: true
  }
});

const progressPercentage = computed(() => {
  const percentage = (props.currentValue / props.maxValue) * 100;
  return `${percentage}%`;
});
</script>

<style scoped>
.progress-bar {
  height: var(--progress-bar-height, 0.5rem);
  width: 100%;
  background-color: var(--background-contrast-grey);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--background-active-blue-france);
  transition: width 0.3s;
}
</style>
