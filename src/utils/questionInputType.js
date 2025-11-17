export function determineQuestionInputType(question) {
  if (question?.choix && question.choix.length <= 5) return 'radio'
  if (question?.choix) return 'select'
  return 'text'
}
