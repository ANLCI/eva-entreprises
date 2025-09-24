import * as diagnosticRisques from './../data/diagnostic_risques'

function reponsesPourQuestion(question) {
  const questionDetails = diagnosticRisques[question]

  return questionDetails.reponses
}

export function scoreDeReponsePourQuestion(question, reponse) {
  const reponses = reponsesPourQuestion(question)
  if (!reponses) return 0

  const reponseDetails = reponses.find((r) => r.nom_technique === reponse)
  const score = reponseDetails ? reponseDetails.score : 0

  return score
}

export function scoreMaxPourQuestion(question) {
  const reponses = reponsesPourQuestion(question)
  if (!reponses) return 0

  const scoreMax = Math.max(...reponses.map((r) => r.score))

  return scoreMax
}
