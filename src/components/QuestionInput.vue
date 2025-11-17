<template>
  <div v-if="currentQuestion">
    <DsfrRadioButtonSet
      v-if="typeInput === 'radio'"
      v-model="internalValue"
      :legend="currentQuestion.intitule"
      :options="computedOptions"
      :name="currentQuestion.nom_technique"
      :rich="true"
    />
    <div v-else-if="typeInput === 'select'" class="fr-pb-4v">
      <DsfrSelect
        v-model="internalValue"
        :label="currentQuestion.intitule"
        :options="computedOptions"
        :name="currentQuestion.nom_technique"
      />
    </div>
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
import { ref, watch, computed, nextTick } from 'vue'
import { determineQuestionInputType } from '@/utils/questionInputType'

const props = defineProps({
  modelValue: [String, Number, null],
  currentQuestion: Object,
})

const emit = defineEmits(['update:modelValue', 'next-question'])

const internalValue = ref(props.modelValue)
const typeInput = ref(determineQuestionInputType(props.currentQuestion))
const isSyncingFromModelValue = ref(false)

watch(
  () => props.modelValue,
  (newVal) => {
    isSyncingFromModelValue.value = true
    internalValue.value = newVal
    nextTick(() => {
      isSyncingFromModelValue.value = false
    })
  },
)

watch(internalValue, (newVal) => {
  emit('update:modelValue', newVal)
  if (
    !isSyncingFromModelValue.value &&
    typeInput.value === 'radio' &&
    newVal !== null &&
    newVal !== undefined
  ) {
    emit('next-question')
  }
})

watch(
  () => props.currentQuestion,
  () => {
    typeInput.value = determineQuestionInputType(props.currentQuestion)
  },
  { deep: true },
)

const computedOptions = computed(() => {
  if (typeInput.value === 'radio') {
    return props.currentQuestion.choix.map((choix) => ({
      label: choix.intitule,
      id: choix.nom_technique,
      value: choix.nom_technique,
      hint: null,
    }))
  }
  if (typeInput.value === 'select') {
    return props.currentQuestion.choix.map((choix) => ({
      text: choix.intitule,
      value: choix.nom_technique,
    }))
  }
  return []
})
</script>
