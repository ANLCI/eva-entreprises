import { test, expect } from '@playwright/test';

const mockApiQuestionnaire1 = [
  {
    "id": "c325e445-6546-4453-a90e-97150abce34e",
    "nom_technique": "Q1PG01",
    "metacompetence": null,
    "type_qcm": "standard",
    "description": "",
    "demarrage_audio_modalite_reponse": false,
    "illustration": null,
    "score": null,
    "type": "qcm",
    "consigne_audio": null,
    "audio_url": null,
    "intitule_audio": null,
    "intitule": "Quelle est la taille de votre entreprise/structure ? ",
    "modalite_reponse": null,
    "choix": [
      {
        "id": "36aad351-6f65-4695-9acf-a914e81e2238",
        "nom_technique": "Q1PG01R1",
        "intitule": "250 salariés et +",
        "type_choix": "bon",
        "position": 1,
        "audio_url": null
      },
      {
        "id": "4dbbb5da-3a7d-4d74-afac-fd82c88d7b43",
        "nom_technique": "Q1PG01R2",
        "intitule": "50 à 249 salariés",
        "type_choix": "bon",
        "position": 2,
        "audio_url": null
      },
    ]
  },
  {
    "id": "6746bda0-5e5c-4eda-a201-af6b68a47efd",
    "nom_technique": "Q1PG04",
    "suffix_reponse": "",
    "description": "",
    "metacompetence": null,
    "demarrage_audio_modalite_reponse": false,
    "illustration": null,
    "aide": "",
    "score": null,
    "type": "saisie",
    "sous_type": "redaction",
    "placeholder": "",
    "texte_a_trous": "",
    "max_length": null,
    "consigne_audio": null,
    "audio_url": null,
    "intitule_audio": null,
    "intitule": "A quelle branche votre structure est-elle rattachée ?",
    "modalite_reponse": null,
    "reponses": []
  }
];

const mockApiQuestionnaire2 = [
  {
    "id": "727257e5-5738-4917-a1c0-54cb14807530",
    "nom_technique": "Q2PC01",
    "metacompetence": null,
    "type_qcm": "standard",
    "description": "",
    "demarrage_audio_modalite_reponse": false,
    "illustration": null,
    "score": null,
    "type": "qcm",
    "consigne_audio": null,
    "audio_url": null,
    "intitule_audio": null,
    "intitule": "Avez-vous parfois l'impression de devoir prendre plus de temps que nécessaire pour vous assurer que vos collaborateurs ou collaboratrices ont bien compris certaines informations ?",
    "modalite_reponse": null,
    "choix": [
      {
        "id": "0fb6c3c1-07ca-4422-a7b2-d2ecb08d7e5d",
        "nom_technique": "Q2PC01R1",
        "intitule": "Oui",
        "type_choix": "bon",
        "position": 1,
        "audio_url": null
      },
      {
        "id": "b07cb7f0-48ac-4ce8-b469-82a388440a6d",
        "nom_technique": "Q2PC01R2",
        "intitule": "Non",
        "type_choix": "bon",
        "position": 2,
        "audio_url": null
      }
    ]
  },
  {
    "id": "6a1af3c4-8548-4d80-97a3-3782e5f6f88d",
    "nom_technique": "Q2PC02",
    "metacompetence": null,
    "type_qcm": "standard",
    "description": "",
    "demarrage_audio_modalite_reponse": false,
    "illustration": null,
    "score": null,
    "type": "qcm",
    "consigne_audio": null,
    "audio_url": null,
    "intitule_audio": null,
    "intitule": "Avez-vous des collègues, chefs, managers, qui estiment devoir prendre en charge une partie du travail de leurs collaborateurs ou collaboratrices (glissement de fonctions) pour pallier les difficultés avec les compétences de base (lire, écrire, compter, cliquer) ?",
    "modalite_reponse": null,
    "choix": [
      {
        "id": "7c17bc6f-d23d-4cd9-9b96-b427d4fdefe1",
        "nom_technique": "Q2PC02R1",
        "intitule": "Oui",
        "type_choix": "bon",
        "position": 1,
        "audio_url": null
      },
      {
        "id": "afc8d864-b72e-41b7-b260-2cb58f0fd9b0",
        "nom_technique": "Q2PC02R2",
        "intitule": "Non",
        "type_choix": "bon",
        "position": 2,
        "audio_url": null
      }
    ]
  },
]

test('Complète le premier questionnaire', async ({ page }) => {
  await page.route('*/**/api/evaluations', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: 1 }),
    });
  });

  await page.route('*/**/api/questionnaires/**', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockApiQuestionnaire1),
    });
  });

  await page.route('*/**/api/evenements', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.goto('/');

  await page.click('button:has-text("Commencer")');

  await expect(page.locator('legend')).toHaveText('Quelle est la taille de votre entreprise/structure ?');

  const choicesList = page.locator('label');
  await expect(choicesList.first()).toContainText('250 salariés et +');
  await expect(choicesList.nth(1)).toContainText('50 à 249 salariés');

  await choicesList.first().click();

  await page.click('button:has-text("Continuer")');

  const inputField = page.locator('input[type="text"]');
  await inputField.fill('Finance');

  await page.click('button:has-text("Valider")');
  await page.waitForURL("**/admin/**")
});

test('reprend le deuxième questionnaire', async ({ page }) => {
  await page.route('*/**/api/evaluations', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: 1 }),
    });
  });

  await page.route('*/**/api/questionnaires/**', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockApiQuestionnaire2),
    });
  });

  await page.route('*/**/api/evenements', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  const evaluationId = "123456"
  await page.goto(`/evaluation-impact?evaluation_id=${evaluationId}`);

  await expect(page.locator('legend')).toHaveText("Avez-vous parfois l'impression de devoir prendre plus de temps que nécessaire pour vous assurer que vos collaborateurs ou collaboratrices ont bien compris certaines informations ?");

  const choicesList1 = page.locator('label');
  await expect(choicesList1.first()).toContainText('Oui');
  await choicesList1.first().click();

  await page.click('button:has-text("Continuer")');

  const choicesList2 = page.locator('label');
  await expect(choicesList2.first()).toContainText('Oui');
  await choicesList2.first().click();

  await page.click('button:has-text("Valider")');

  await page.waitForURL("**/admin/**")
});
