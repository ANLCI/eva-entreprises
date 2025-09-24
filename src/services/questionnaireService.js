export async function fetchQuestionnaire(id) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const url = `${apiUrl}/questionnaires/${id}`

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch questionnaire')
  }
  return response.json()
}
