import * as diagnosticRisques from './../data/situations/diagnostic_risques'
import * as evaluationImpact from './../data/situations/evaluation_impact'

const questions = {
  diag_risques_entreprise: diagnosticRisques,
  evaluation_impact_general: evaluationImpact,
}

export function detailPourQuestion(nomTechniqueSansVariantDeSituation, question) {
  const questionsPourSituation = questions[nomTechniqueSansVariantDeSituation]
  if (!questionsPourSituation) return undefined

  const question_sans_variant = question.split('__')[0]
  const questionDetails = questionsPourSituation[question_sans_variant]
  if (!questionDetails) return undefined

  return questionDetails
}

export function reponsesPourQuestion(nomTechniqueSansVariantDeSituation, question) {
  const questionDetails = detailPourQuestion(nomTechniqueSansVariantDeSituation, question)
  if (!questionDetails) return undefined

  return questionDetails.reponses
}

export function reponsePourQuestion(nomTechniqueSansVariantDeSituation, question, reponse) {
  const reponses = reponsesPourQuestion(nomTechniqueSansVariantDeSituation, question)
  if (!reponses) return null

  return reponses.find((r) => r.nom_technique === reponse)
}

export function scoreDeReponsePourQuestion(nomTechniqueSansVariantDeSituation, question, reponse) {
  const reponseDetails = reponsePourQuestion(nomTechniqueSansVariantDeSituation, question, reponse)
  const score = reponseDetails ? reponseDetails.score : 0

  return score
}

export function scoreMaxPourQuestion(nomTechniqueSansVariantDeSituation, question) {
  const reponses = reponsesPourQuestion(nomTechniqueSansVariantDeSituation, question)
  if (!reponses) return 0

  const scoreMax = Math.max(...reponses.map((r) => r.score))

  return scoreMax
}
