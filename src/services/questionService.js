import * as diagnosticRisques from './../data/situations/diagnostic_risques'
import * as evaluationImpact from './../data/situations/evaluation_impact'

const questions = {
  diag_risques_entreprise: diagnosticRisques,
  evaluation_impact_general: evaluationImpact,
}

export function detailPourQuestion(nomTechniqueSansVariantDeSituation, question) {
  const questionsPourSituation = questions[nomTechniqueSansVariantDeSituation]
  if (!questionsPourSituation) return undefined

  const questionDetails = questionsPourSituation[question]
  if (!questionDetails) return undefined

  return questionDetails
}

export function reponsesPourQuestion(nomTechniqueSansVariantDeSituation, question) {
  const questionDetails = detailPourQuestion(nomTechniqueSansVariantDeSituation, question)
  if (!questionDetails) return undefined

  return questionDetails.reponses
}

export function scoreDeReponsePourQuestion(nomTechniqueSansVariantDeSituation, question, reponse) {
  const reponses = reponsesPourQuestion(nomTechniqueSansVariantDeSituation, question)
  if (!reponses) return 0

  const reponseDetails = reponses.find((r) => r.nom_technique === reponse)
  const score = reponseDetails ? reponseDetails.score : 0

  return score
}

export function scoreMaxPourQuestion(nomTechniqueSansVariantDeSituation, question) {
  const reponses = reponsesPourQuestion(nomTechniqueSansVariantDeSituation, question)
  if (!reponses) return 0

  const scoreMax = Math.max(...reponses.map((r) => r.score))

  return scoreMax
}
