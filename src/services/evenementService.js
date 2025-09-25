import { useEvaluationStore } from './../stores/evaluationStore'
import { useEvenementStore } from './../stores/evenementStore'
import { scoreDeReponsePourQuestion, scoreMaxPourQuestion } from './questionService'

const EVALUATION_NAMES = {
  DEMARRAGE: 'demarrage',
  FIN_SITUATION: 'finSituation',
  AFFICHAGE_QUESTION_QCM: 'affichageQuestionQCM',
  REPONSE: 'reponse',
}

/**
 * Service pour faire appel à l'API et créer un évènement
 *
 * @param {Object} evenementParams - Un objet contenant les paramètres de l'évènement.
 * @returns {Promise<Object>} La réponse de l'API sous forme de JSON.
 */
export async function creeEvenement(evenementParams) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const url = `${apiUrl}/evenements`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evenementParams),
  })

  if (!response.ok) {
    throw new Error(`Erreur lors de la création de l'évènement: ${response.statusText}`)
  }

  return response.json()
}

function getEvenementParamsBase(nom) {
  const evaluationStore = useEvaluationStore()
  const evaluationId = evaluationStore.evaluationId

  const evenementStore = useEvenementStore()
  const session_id = evenementStore.session_id
  const position = evenementStore.getCurrentPosition()
  const nomTechniqueSituation = import.meta.env.VITE_NOM_TECHNIQUE_SITUATION_EVA_ENTREPRISES

  return {
    nom: nom,
    date: Date.now(),
    session_id: session_id,
    position: position,
    situation: nomTechniqueSituation,
    evaluation_id: evaluationId,
  }
}

export function getEvenementDemarrageParams() {
  return getEvenementParamsBase(EVALUATION_NAMES.DEMARRAGE)
}

export function getEvenementFinSituationParams() {
  return getEvenementParamsBase(EVALUATION_NAMES.FIN_SITUATION)
}

export function getEvenementAffichageQuestionParams(question) {
  const baseParams = getEvenementParamsBase(EVALUATION_NAMES.AFFICHAGE_QUESTION_QCM)

  return {
    ...baseParams,
    ...{
      donnees: {
        question: question.nom_technique,
      },
    },
  }
}

export function getEvenementResponseParams(questionNomTechnique, reponse, intitule) {
  const baseParams = getEvenementParamsBase(EVALUATION_NAMES.REPONSE)

  const score = scoreDeReponsePourQuestion(questionNomTechnique, reponse)
  const scoreMax = scoreMaxPourQuestion(questionNomTechnique)

  return {
    ...baseParams,
    ...{
      donnees: {
        question: questionNomTechnique,
        reponse: reponse,
        intitule: intitule,
        score: score,
        scoreMax: scoreMax,
      },
    },
  }
}
