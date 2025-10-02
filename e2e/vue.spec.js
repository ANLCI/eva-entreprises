import { test, expect } from '@playwright/test';

const mockApiResponse = [
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

test('visits the app root url and stubs API call', async ({ page }) => {
  await page.route('*/**/api/evaluations', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: 1 }),
    });
  });

  await page.route('*/**/api/questionnaires/**', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockApiResponse),
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

  // Select the first choice
  await choicesList.first().click();

  await page.click('button:has-text("Continuer")');

  // await expect(page.locator('label')).toHaveText('A quelle branche votre structure est-elle rattachée ?');

  const inputField = page.locator('input[type="text"]');
  await inputField.fill('Finance');

  await page.click('button:has-text("Valider")');
  // await page.pause()
  await page.waitForURL("**/admin/**")
  // await expect(page.url()).toContain('/admin/');
});
