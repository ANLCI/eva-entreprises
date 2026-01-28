<script setup>
import { ref, onMounted, watch } from 'vue'
import { recupereSituations } from './../services/campagneService'
import { detailPourQuestion } from './../services/questionService'
import { thematiques } from './../data/thematiques.js'
import { useRoute } from 'vue-router'

const menuItems = ref([])
const route = useRoute()
const props = defineProps({
  currentQuestion: {
    type: Object,
    default: null,
  },
})

let situationCourante
let situations = []

const construitMenu = () => {
  if (!situationCourante) return

  menuItems.value = situations.map((situation) => {
    const active = situationCourante.nom_technique === situation.nom_technique
    const thematiqueItems = thematiques[situation.nom_technique_sans_variant]
    let thematiqueActive = active
    const menuItemsForSituation = thematiqueItems
      ? thematiqueItems.map((item) => {
          const menu = {
            id: item.toLowerCase().replace(/\s+/g, '-'),
            to: '',
            text: item,
            active: thematiqueActive,
          }
          thematiqueActive = false
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
}

const metAJourSituationCourante = (id) => {
  if (!id || !situations.length) return
  situationCourante = situations.find((situation) => String(situation.id) === String(id))
  if (!situationCourante) {
    console.warn('Situation non trouvée pour id :', id)
    return
  }
  construitMenu()
}

onMounted(async () => {
  situations = await recupereSituations()
  metAJourSituationCourante(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    metAJourSituationCourante(newId)
  },
)

watch(
  () => props.currentQuestion?.nom_technique,
  (nomTechnique) => {
    if (nomTechnique && situationCourante) {
      const questionData = detailPourQuestion(
        situationCourante.nom_technique_sans_variant,
        nomTechnique,
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
