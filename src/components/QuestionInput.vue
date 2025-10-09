<template>
  <div v-if="currentQuestion">
    <DsfrRadioButtonSet
      v-if="currentQuestion.type === 'qcm'"
      v-model="internalValue"
      :legend="currentQuestion.intitule"
      :options="computedOptions"
      :name="currentQuestion.nom_technique"
      :rich="true"
    />
    <div v-else class="fr-pb-4v">
      <DsfrInputGroup
        v-model="internalValue"
        :label="currentQuestion.intitule"
        :name="currentQuestion.nom_technique"
        type="text"
        label-visible
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number, null],
  currentQuestion: Object,
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal
  },
)

watch(internalValue, (newVal) => {
  emit('update:modelValue', newVal)
})

const computedOptions = computed(() => {
  if (props.currentQuestion && props.currentQuestion.choix) {
    return props.currentQuestion.choix.map((choix) => ({
      label: choix.intitule,
      id: choix.nom_technique,
      value: choix.nom_technique,
      hint: null
    }))
  }
  return []
})
</script>
