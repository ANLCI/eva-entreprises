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
