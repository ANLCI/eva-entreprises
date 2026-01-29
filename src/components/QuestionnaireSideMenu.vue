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
  opcoFinanceur: {
    type: Object,
    required: false,
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
  <div class="questionnaire-side-menu-container">
    <div v-if="opcoFinanceur && opcoFinanceur.logo_url" class="questionnaire-side-menu-header">
      <div class="questionnaire-side-menu-partner">
        <p class="questionnaire-side-menu-partner-title fr-text">En partenariat avec</p>
        <img
          :src="opcoFinanceur.logo_url"
          :alt="opcoFinanceur.nom"
          class="questionnaire-side-menu-partner-logo"
        />
      </div>
    </div>
    <DsfrSideMenu class="questionnaire-side-menu" :menu-items="menuItems" />
  </div>
</template>

<style>
.questionnaire-side-menu-container {
  display: flex;
  flex-direction: column;
}

.questionnaire-side-menu-header {
  display: flex;
  flex-direction: column;
  padding-top: 2.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
  box-shadow: inset -1px 0 0 0 var(--border-default-grey);
}

.questionnaire-side-menu-partner {
  display: flex;
  padding: var(--Space-3W, 1.5rem);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--Space-2W, 1rem);
  align-self: stretch;
  border: 1px solid var(--light-decisions-border-border-default-grey, #ddd);
  background: var(--light-decisions-background-background-alt-grey, #f6f6f6);
}

.questionnaire-side-menu-partner-title {
  color: var(--light-decisions-text-text-default-grey, #3a3a3a);

  /* 2.Corps de texte/MD - Texte standard/Desktop & Mobile - Bold */
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  margin: 0;
}

.questionnaire-side-menu-partner-logo {
  width: auto;
  height: 56px;
  object-fit: contain;
}

.questionnaire-side-menu {
  padding-right: 0;
}

.questionnaire-side-menu .fr-sidemenu__item a {
  cursor: default;
}

@media screen and (max-width: 768px) {
  .questionnaire-side-menu-header {
    padding-top: 1.5rem;
    padding-right: 0;
    box-shadow: none;
  }

  .questionnaire-side-menu {
    padding-left: 0;
    margin-top: 0;
  }
}

.fr-sidemenu__title {
  margin: 0;
}
</style>
