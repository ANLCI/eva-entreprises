import { useEvaluationStore } from './../stores/evaluationStore'
import { useEvenementStore } from './../stores/evenementStore'
import { useCampagneStore } from './../stores/campagneStore'
import { conditionsPassationHelper } from './helpers/conditionsPassationHelper'
import { recupereCampagne } from './campagneService'

/**
 * Service pour faire appel à l'API et créer une évaluation.
 *
 * @param {Object} evaluationParams - Un objet contenant les paramètres de l'évaluation.
 * @returns {Promise<Object>} La réponse de l'API sous forme de JSON.
 */
export async function creeEvaluation(evaluationParams) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const url = `${apiUrl}/evaluations`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evaluationParams),
  })

  if (!response.ok) {
    throw new Error(`Erreur lors de la création de l'évaluation : ${response.statusText}`)
  }

  return response.json()
}

export async function recupereEvaluationApi(evaluationId) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const url = `${apiUrl}/evaluations/${evaluationId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de l'évaluation : ${response.statusText}`)
  }

  return response.json()
}

export function getEvaluationParams(code_campagne, beneficiaire_id) {
  return {
    code_campagne: code_campagne,
    debutee_le: new Date().toISOString(),
    beneficiaire_id: beneficiaire_id,
    conditions_passation_attributes: conditionsPassationHelper(),
  }
}

/**
 * Service pour initialiser une nouvelle évaluation.
 */
export async function commenceNouvelleEvaluation(code_campagne, beneficiaire_id) {
  const evaluationStore = useEvaluationStore()
  const evenementStore = useEvenementStore()
  const campagneStore = useCampagneStore()
  const params = getEvaluationParams(code_campagne, beneficiaire_id)

  await campagneStore.resetCampagne()

  try {
    const data = await creeEvaluation(params)
    // Récupérer l'ID de l'évaluation de la réponse API
    const evaluationId = data.id

    // Stocker l'ID dans le store Pinia
    evaluationStore.setEvaluationId(evaluationId)
    evenementStore.resetPosition()
    evenementStore.resetSessionId()

    await recupereCampagne(code_campagne)

    return evaluationId
  } catch (error) {
    console.error(`Erreur lors de la création de l'évaluation: ${error.message}`)
    throw error
  }
}

export async function recupereSituationCourante() {
  const campagneStore = useCampagneStore()
  const evaluationStore = useEvaluationStore()

  return campagneStore.getSituationCourante(evaluationStore.codeSituationCourante)
}

export async function recupereEvaluation(evaluationId) {
  const data = await recupereEvaluationApi(evaluationId)

  return data
}
