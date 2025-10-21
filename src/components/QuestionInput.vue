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
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number, null],
  currentQuestion: Object,
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
const typeInput = ref(definiTypeInput())

function definiTypeInput() {
  if (
    props.currentQuestion &&
    props.currentQuestion.choix &&
    props.currentQuestion.choix.length <= 5
  ) {
    return 'radio'
  } else if (props.currentQuestion && props.currentQuestion.choix) {
    return 'select'
  } else {
    return 'text'
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal
  },
)

watch(internalValue, (newVal) => {
  emit('update:modelValue', newVal)
})

watch(
  () => props.currentQuestion,
  () => {
    typeInput.value = definiTypeInput()
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
