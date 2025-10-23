import * as diagnosticRisques from './../data/diagnostic_risques'
import * as evaluationImpact from './../data/evaluation_impact'

const questions = {
  diag_risques_entreprise: diagnosticRisques,
  evaluation_impact_general: evaluationImpact,
}

export function reponsesPourQuestion(situation, question) {
  const baseSituation = situation.split('__')[0];

  const questionsPourSituation = questions[baseSituation];
  if (!questionsPourSituation) return undefined;

  const questionDetails = questionsPourSituation[question];
  if (!questionDetails) return undefined;

  return questionDetails.reponses;
}

export function scoreDeReponsePourQuestion(situation, question, reponse) {
  const reponses = reponsesPourQuestion(situation, question)
  if (!reponses) return 0

  const reponseDetails = reponses.find((r) => r.nom_technique === reponse)
  const score = reponseDetails ? reponseDetails.score : 0

  return score
}

export function scoreMaxPourQuestion(situation, question) {
  const reponses = reponsesPourQuestion(situation, question)
  if (!reponses) return 0

  const scoreMax = Math.max(...reponses.map((r) => r.score))

  return scoreMax
}
