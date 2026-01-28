import { thematiques } from '../thematiques'

const thematiqueSituation = thematiques.diag_risques_entreprise

export const Q1IC01 = {
  nom_technique: 'Q1IC01',
  question: 'Quelle est la taille de votre entreprise/structure ?',
  thematique: thematiqueSituation[0],
  reponses: [
    { nom_technique: 'Q1IC01R01', intitule: '250 salariés et +', score: 0 },
    { nom_technique: 'Q1IC01R02', intitule: '50 à 249 salariés/agents', score: 0 },
    { nom_technique: 'Q1IC01R03', intitule: '11 à 49 salariés/agents', score: 0 },
    { nom_technique: 'Q1IC01R04', intitule: '1 à 10 salariés/agents', score: 0 },
  ],
}

export const Q1IC02 = {
  nom_technique: 'Q1IC02',
  question: "Quel est l'âge moyen de vos salariés/agents ?",
  thematique: thematiqueSituation[0],
  reponses: [
    { nom_technique: 'Q1IC02R01', intitule: '50 ans et plus', score: 2 },
    { nom_technique: 'Q1IC02R02', intitule: 'Entre 30 et 50 ans', score: 0 },
    { nom_technique: 'Q1IC02R03', intitule: 'Moins de 30 ans', score: 1 },
  ],
}

export const Q1IC03 = {
  nom_technique: 'Q1IC03',
  question: "Votre secteur d'activité (basé sur les chiffres 2021)",
  thematique: thematiqueSituation[0],
  reponses: [
    { nom_technique: 'Q1IC03R01', intitule: 'Agriculture et pêche', score: 2 },
    { nom_technique: 'Q1IC03R02', intitule: 'Agro-alimentaire', score: 2 },
    { nom_technique: 'Q1IC03R03', intitule: 'Aide à domicile', score: 2 },
	{ nom_technique: 'Q1IC03R04', intitule: 'Animation, loisirs et spectacles', score: 0 },
    { nom_technique: 'Q1IC03R05', intitule: 'BTP', score: 2 },
    { nom_technique: 'Q1IC03R06', intitule: 'Collectivités', score: 1 },
    { nom_technique: 'Q1IC03R07', intitule: 'Commerce', score: 0 },
    {
      nom_technique: 'Q1IC03R08',
      intitule: 'Entretien, maintenance, services techniques',
      score: 1,
    },
    { nom_technique: 'Q1IC03R09', intitule: 'Espaces-verts', score: 1 },
    { nom_technique: 'Q1IC03R010', intitule: 'FPH', score: 1 },
    { nom_technique: 'Q1IC03R011', intitule: 'Hôtellerie-restauration', score: 1 },
    {
      nom_technique: 'Q1IC03R012',
      intitule: 'Industrie (métallurgie, chimie, bois/papier, pharmacie, textile, automobile…)',
      score: 2,
    },
    { nom_technique: 'Q1IC03R013', intitule: 'Propreté', score: 2 },
    { nom_technique: 'Q1IC03R014', intitule: 'Sanitaire social et médico-social', score: 1 },
    { nom_technique: 'Q1IC03R015', intitule: 'Sécurité', score: 1 },
    { nom_technique: 'Q1IC03R016', intitule: 'Transport/Logistique', score: 1 },
    { nom_technique: 'Q1IC03R017', intitule: 'Autre', score: 0 },
  ],
}

export const Q1IC04 = {
  nom_technique: 'Q1IC04',
  question: 'A quelle branche votre structure est-elle rattachée ?',
  thematique: thematiqueSituation[0],
}

export const Q1IC05 = {
  nom_technique: 'Q1IC05',
  question: 'Diriez-vous que dans votre entreprise/structure, vous avez plutôt :',
  thematique: thematiqueSituation[0],
  reponses: [
    { nom_technique: 'Q1IC05R01', intitule: "Une culture de l'écrit", score: 1 },
    { nom_technique: 'Q1IC05R02', intitule: "Une culture de l'oral", score: 0 },
    { nom_technique: 'Q1IC05R03', intitule: 'Une culture du numérique', score: 1 },
    { nom_technique: 'Q1IC05R04', intitule: 'Un mixte', score: 1 },
  ],
}

export const Q1PC01 = {
  nom_technique: 'Q1PC01',
  question: 'La majorité de vos salariés/agents sont :',
  thematique: thematiqueSituation[1],
  reponses: [
    { nom_technique: 'Q1PC01R01', intitule: 'Des ouvriers', score: 2 },
    { nom_technique: 'Q1PC01R02', intitule: 'Des employés/agents de service', score: 2 },
    { nom_technique: 'Q1PC01R03', intitule: 'Des techniciens', score: 0 },
    { nom_technique: 'Q1PC01R04', intitule: 'Des cadres', score: 0 },
    { nom_technique: 'Q1PC01R05', intitule: 'Je ne sais pas', score: 0 },
  ],
}

export const Q1PC02 = {
  nom_technique: 'Q1PC02',
  question: 'Quel est le niveau de diplôme le plus représenté :',
  thematique: thematiqueSituation[1],
  reponses: [
    { nom_technique: 'Q1PC02R01', intitule: 'Sans diplôme', score: 3 },
    { nom_technique: 'Q1PC02R02', intitule: 'CAP ou BEP (niveau 3)', score: 2 },
    { nom_technique: 'Q1PC02R03', intitule: 'Bac ou bac pro (niveau 4)', score: 1 },
    { nom_technique: 'Q1PC02R04', intitule: 'Bac+2/3 (niveau 5/6)', score: 0 },
    { nom_technique: 'Q1PC02R05', intitule: 'Bac+5 (niveau 7)', score: 0 },
    { nom_technique: 'Q1PC02R06', intitule: 'Je ne sais pas', score: 0 },
  ],
}

export const Q1PC03 = {
  nom_technique: 'Q1PC03',
  question:
    'Avez-vous, au sein de vos effectifs, connaissance de salariés/agents maîtrisant mal les compétences de base (lecture, écriture, calcul) ou les compétences numériques ?',
  thematique: thematiqueSituation[1],
  reponses: [
    { nom_technique: 'Q1PC03R01', intitule: 'Oui, une majorité', score: 3 },
    { nom_technique: 'Q1PC03R02', intitule: 'Oui, une partie', score: 2 },
    { nom_technique: 'Q1PC03R03', intitule: 'Non pas vraiment', score: 1 },
    { nom_technique: 'Q1PC03R04', intitule: 'Non pas du tout', score: 0 },
    { nom_technique: 'Q1PC03R05', intitule: 'Je ne sais pas', score: 1 },
  ],
}

export const Q1GC01 = {
  nom_technique: 'Q1GC01',
  question:
    'Globalement, votre plan de développement des compétences (plan de formation) bénéficie à :',
  thematique: thematiqueSituation[2],
  reponses: [
    {
      nom_technique: 'Q1GC01R01',
      intitule: 'Plus de 30 % à la population Technicien Agent de Maitrise (TAM)/Cadres',
      score: 0,
    },
    { nom_technique: 'Q1GC01R02', intitule: 'Plus de 50 % à la population TAM/Cadres', score: 1 },
    { nom_technique: 'Q1GC01R03', intitule: 'Plus de 75 % à la population TAM/Cadres', score: 2 },
    { nom_technique: 'Q1GC01R04', intitule: 'Je Ne sais pas', score: 0 },
  ],
}

export const Q1GC02 = {
  nom_technique: 'Q1GC02',
  question: "Parmi la catégorie ouvriers/employés/agents de service, diriez-vous qu'ils sont :",
  thematique: thematiqueSituation[2],
  reponses: [
    {
      nom_technique: 'Q1GC02R01',
      intitule: 'Moins de 30 % à suivre une formation tous les ans',
      score: 3,
    },
    {
      nom_technique: 'Q1GC02R02',
      intitule: 'Moins de 50 % à suivre une formation tous les ans',
      score: 2,
    },
    {
      nom_technique: 'Q1GC02R03',
      intitule: 'Moins de 85 % à suivre une formation tous les ans',
      score: 1,
    },
    {
      nom_technique: 'Q1GC02R04',
      intitule: '100 % des salariés suivent une formation au moins une fois par an',
      score: 0,
    },
  ],
}

export const Q1GC03 = {
  nom_technique: 'Q1GC03',
  question:
    'La non maîtrise des compétences de base (lecture, écriture, calcul / raisonnement) est-elle un frein à la réalisation des tâches professionnelles de vos salariés / agents ?',
  thematique: thematiqueSituation[2],
  reponses: [
    { nom_technique: 'Q1GC03R01', intitule: 'Oui', score: 2 },
    { nom_technique: 'Q1GC03R02', intitule: 'Non', score: 0 },
  ],
}

export const Q1GC04 = {
  nom_technique: 'Q1GC04',
  question:
    'La non maîtrise des compétences numériques de base est-elle un frein à la réalisation des tâches professionnelles de vos salariés / agents ?',
  thematique: thematiqueSituation[2],
  reponses: [
    { nom_technique: 'Q1GC04R01', intitule: 'Oui', score: 2 },
    { nom_technique: 'Q1GC04R02', intitule: 'Non', score: 0 },
  ],
}

export const Q1GC05 = {
  nom_technique: 'Q1GC05',
  question:
    "Parmi vos salariés/agents, diriez-vous qu'il est possible que certains ne soient jamais allés en formation ces cinq dernières années ?",
  thematique: thematiqueSituation[2],
  reponses: [
    { nom_technique: 'Q1GC05R01', intitule: 'Oui, certainement', score: 2 },
    { nom_technique: 'Q1GC05R02', intitule: 'Oui, probablement', score: 1 },
    { nom_technique: 'Q1GC05R03', intitule: 'Non, je ne crois pas', score: 1 },
    { nom_technique: 'Q1GC05R04', intitule: "Non, c'est impossible", score: 0 },
  ],
}

export const Q1GC06 = {
  nom_technique: 'Q1GC06',
  question:
    'Avez-vous mis en place des actions de formation pour développer les compétences de base de vos salariés ou avez-vous été accompagnés sur un tel projet ?',
  thematique: thematiqueSituation[2],
  reponses: [
    { nom_technique: 'Q1GC06R01', intitule: 'Oui', score: 0 },
    { nom_technique: 'Q1GC06R02', intitule: 'Non', score: 0 },
    { nom_technique: 'Q1GC06R03', intitule: 'En cours', score: 0 },
  ],
}

export const Q1PR01 = {
  nom_technique: 'Q1PR01',
  question:
    "Votre processus de recrutement intègre-t-il systématiquement un test de niveau de maîtrise de l'expression écrite ?",
  thematique: thematiqueSituation[3],
  reponses: [
    {
      nom_technique: 'Q1PR01R01',
      intitule: 'Non, certains postes ne nécessitant pas de niveau minimum requis',
      score: 3,
    },
    {
      nom_technique: 'Q1PR01R02',
      intitule: 'Non, on ne contrôle généralement pas le niveau',
      score: 1,
    },
    { nom_technique: 'Q1PR01R03', intitule: 'Oui, pour tous les postes', score: 0 },
  ],
}

export const Q1PR02 = {
  nom_technique: 'Q1PR02',
  question:
    'Votre processus de recrutement intègre-t-il systématiquement un test de niveau de maîtrise des compétences numériques de base ?',
  thematique: thematiqueSituation[3],
  reponses: [
    {
      nom_technique: 'Q1PR02R01',
      intitule: 'Non, certains postes ne nécessitant pas de niveau minimum requis',
      score: 3,
    },
    {
      nom_technique: 'Q1PR02R02',
      intitule: 'Non, on ne contrôle généralement pas le niveau',
      score: 1,
    },
    { nom_technique: 'Q1PR02R03', intitule: 'Oui, pour tous les postes', score: 0 },
  ],
}

export const Q1TO01 = {
  nom_technique: 'Q1TO01',
  question:
    "Avez-vous dans votre entreprise/structure des postes qui n'ont pas évolué (missions, activités, environnement de travail, …) depuis 10 ans ou plus ?",
  thematique: thematiqueSituation[4],
  reponses: [
    { nom_technique: 'Q1TO01R01', intitule: 'Oui, en majorité', score: 3 },
    { nom_technique: 'Q1TO01R02', intitule: 'Oui, pour une partie', score: 1 },
    { nom_technique: 'Q1TO01R03', intitule: 'Non', score: 0 },
  ],
}

export const Q1TO02 = {
  nom_technique: 'Q1TO02',
  question: 'Aujourd’hui, vous estimez votre transition numérique est :',
  thematique: thematiqueSituation[4],
  reponses: [
    { nom_technique: 'Q1TO02R01', intitule: 'Très avancée', score: 0 },
    { nom_technique: 'Q1TO02R02', intitule: 'En cours', score: 0 },
    { nom_technique: 'Q1TO02R03', intitule: 'A mettre en place', score: 0 },
  ],
}

export const Q1TO03 = {
  nom_technique: 'Q1TO03',
  question: 'Avez-vous déjà digitalisé/robotisé vos activités de production / accompagnement ?',
  thematique: thematiqueSituation[4],
  reponses: [
    { nom_technique: 'Q1TO03R01', intitule: 'Oui', score: 0 },
    { nom_technique: 'Q1TO03R02', intitule: 'Non', score: 0 },
  ],
}

export const Q1TO04 = {
  nom_technique: 'Q1TO04',
  question:
    'Avez-vous déjà digitalisé/numérisé vos activités de services support (paie, gestion des frais, comptabilité, achats...) ?',
  thematique: thematiqueSituation[4],
  reponses: [
    { nom_technique: 'Q1TO04R01', intitule: 'Oui', score: 0 },
    { nom_technique: 'Q1TO04R02', intitule: 'Non', score: 0 },
  ],
}
