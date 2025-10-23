import { mockApiQuestionnaire1 } from './questionnaire1';

export const mockApiSituation1 = {
  id: "7aa655d5-18e8-44ff-94e0-b9cc50037500",
  libelle: "Détails de la situation",
  nom_technique: "diag_risques_entreprise",
  nom_technique_sans_variant: "diag_risques_entreprise",

  questionnaire_id: mockApiQuestionnaire1.id,
  questions: mockApiQuestionnaire1,
}
