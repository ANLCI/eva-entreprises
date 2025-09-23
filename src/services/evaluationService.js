import { useEvaluationStore } from './../stores/evaluationStore'
import { useEvenementStore } from './../stores/evenementStore'
import { conditionsPassationHelper } from './helpers/conditionsPassationHelper'

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
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la création de l'évaluation: ${response.statusText}`);
  }

  return response.json();
}

export function getEvaluationParams() {
  return {
    code_campagne: import.meta.env.VITE_CODE_CAMPAGNE_EVA_ENTREPRISES,
    debutee_le: new Date().toISOString(),
    beneficiaire_id: import.meta.env.VITE_ID_BENEFICIAIRE_EVA_ENTREPRISES,
    conditions_passation_attributes: conditionsPassationHelper()
  };
}

/**
 * Service pour initialiser une nouvelle évaluation.
 */
export async function commenceNouvelleEvaluation() {
  const evaluationStore = useEvaluationStore();
  const evenementStore = useEvenementStore();
  const params = getEvaluationParams();

  try {
    const data = await creeEvaluation(params);
    // Récupérer l'ID de l'évaluation de la réponse API
    const evaluationId = data.id;

    // Stocker l'ID dans le store Pinia
    evaluationStore.setEvaluationId(evaluationId);
    evenementStore.resetPosition();

    return evaluationId;
  } catch (error) {
    console.error(`Erreur lors de la création de l'évaluation: ${error.message}`);
    throw error; // Renvoyer l'erreur pour qu'elle soit traitée dans la vue
  }
}
