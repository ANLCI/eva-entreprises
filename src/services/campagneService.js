import { useCampagneStore } from './../stores/campagneStore'

export async function fetchCampagne(codeCampagne) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const url = `${apiUrl}/campagnes/${codeCampagne}`

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch campagne')
  }
  return response.json()
}

export async function  recupereCampagne(codeCampagne) {
  const campagneStore = useCampagneStore()

  let campagne = campagneStore.getCampagne();
  if (campagne) return campagne

  campagne = await fetchCampagne(codeCampagne)

  campagneStore.setLibelle(campagne.libelle)
  campagneStore.setCode(campagne.code)
  campagneStore.setSituations(campagne.situations)
  return campagne
}
