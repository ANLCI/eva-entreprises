export async function fetchQuestionnaire(id) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${apiUrl}/questionnaires/${id}.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch questionnaire');
  }
  return response.json();
}
