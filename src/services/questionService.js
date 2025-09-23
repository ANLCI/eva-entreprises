import * as diagnosticRisques from './../data/diagnostic_risques'

export function scoreDeReponsePourQuestion(question, reponse) {
  const questionDetails = diagnosticRisques[question];
  const reponseDetails = questionDetails.reponses.find(r => r.nom_technique === reponse);
  const score = reponseDetails ? reponseDetails.score : 0;

  return score;
}

export function scoreMaxPourQuestion(question) {
  const questionDetails = diagnosticRisques[question];
  const scoreMax = Math.max(...questionDetails.reponses.map(r => r.score));

  return scoreMax;
}
