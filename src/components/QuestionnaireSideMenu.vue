<script setup>
import { ref, onMounted, watch, defineProps } from 'vue'
import { recupereSituations } from './../services/campagneService'
import { detailPourQuestion } from './../services/questionService'
import { thematiques } from './../data/thematiques.js'
import { useRoute } from 'vue-router'

const menuItems = ref([])
const route = useRoute()
const props = defineProps(['currentQuestion'])

let situationCourante

onMounted(async () => {
  const situations = await recupereSituations()
  situationCourante = situations.find((situation) => situation.id === route.params.id)

  let thematiqueText = ''
  if (props.currentQuestion) {
    const questionData = detailPourQuestion(
      situationCourante.nom_technique_sans_variant,
      props.currentQuestion.nom_technique,
    )
    thematiqueText = questionData.thematique
  }
  menuItems.value = situations.map((situation) => {
    const active = situationCourante.nom_technique === situation.nom_technique
    const thematiqueItems = thematiques[situation.nom_technique_sans_variant]

    const menuItemsForSituation = thematiqueItems
      ? thematiqueItems.map((item) => {
          const menu = {
            id: item.toLowerCase().replace(/\s+/g, '-'),
            to: '',
            text: item,
            active: thematiqueText == item,
          }
          return menu
        })
      : []

    return {
      id: situation.nom_technique,
      text: situation.libelle,
      to: '',
      active: active,
      expanded: active,
      menuItems: menuItemsForSituation,
    }
  })
})

watch(
  () => props.currentQuestion,
  (newQuestion) => {
    if (newQuestion) {
      const questionData = detailPourQuestion(
        situationCourante.nom_technique_sans_variant,
        newQuestion.nom_technique,
      )
      const thematiqueText = questionData.thematique
      const situationItem = menuItems.value.find((item) => item.active === true)

      if (situationItem) {
        situationItem.menuItems.forEach((item) => {
          item.active = false // Désactive tous les items de la thématique
        })

        const thematiqueItem = situationItem.menuItems.find((item) => item.text === thematiqueText)
        if (thematiqueItem) {
          thematiqueItem.active = true
        } else {
          console.warn('Thématique non trouvée pour le texte :', thematiqueText)
        }
      }
    }
  },
)
</script>

<template>
  <DsfrSideMenu class="questionnaire-side-menu" :menu-items="menuItems" />
</template>

<style>
.questionnaire-side-menu {
  margin-top: var(--progress-bar-height);
  padding-right: 0;
  padding-left: 1.5rem;
}

.questionnaire-side-menu .fr-sidemenu__item a {
  cursor: default;
}

@media screen and (max-width: 768px) {
  .questionnaire-side-menu {
    padding-left: 0;
    margin-top: 0;
  }
}
</style>
