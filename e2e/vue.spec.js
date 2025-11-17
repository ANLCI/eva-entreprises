import { test, expect } from '@playwright/test';

import { mockApiCampagne } from './fixtures/campagne';

const beneficiaireId = "12345"

test('Complète le premier questionnaire', async ({ page }) => {
  const sousMenuThematiqueActif = '#diag_risques_entreprise .fr-sidemenu__item.fr-sidemenu__item--active'
  const evaluationId = 1;
  await page.route('*/**/api/evaluations', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: evaluationId }),
    });
  });

  await page.route(`*/**/api/campagnes/${mockApiCampagne.code}`, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockApiCampagne),
    });
  });

  await page.route('*/**/api/evenements', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.goto(`/?code=${mockApiCampagne.code}&beneficiaire_id=${beneficiaireId}`);

  await page.click('button:has-text("Commencer")');
  await expect(page.locator('.progress-bar-fill')).toHaveAttribute('style', 'width: 50%;');

  await expect(page.locator(sousMenuThematiqueActif)).toHaveText("Identité & culture d'organisation")

  await expect(page).toHaveURL(`/situations/${mockApiCampagne.situations[0].id}`)

  await expect(page.locator('legend')).toHaveText('Quelle est la taille de votre entreprise/structure ?');

  const choicesList = page.locator('label');
  await expect(choicesList.first()).toContainText('250 salariés et +');
  await expect(choicesList.nth(1)).toContainText('50 à 249 salariés');

  await choicesList.first().click();

  page.waitForFunction(() => document.querySelector('label')?.textContent?.includes('A quelle branche votre structure est-elle rattachée ?'))
  await expect(page.locator(sousMenuThematiqueActif)).toHaveText("Gestion des compétences")

  const inputField = page.locator('input[type="text"]');
  await inputField.fill('Finance');

  await page.click('button:has-text("Valider")');

  // eslint-disable-next-line no-undef
  const evaluationUrl = `${process.env.VITE_ADMIN_BASE_URL}/evaluations/${evaluationId}`
  await page.route(evaluationUrl, async route => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });
  await page.waitForURL(evaluationUrl)
});

test('passe automatiquement la question radio puis affiche le bouton en revenant en arrière', async ({ page }) => {
  const sousMenuThematiqueActif = '#diag_risques_entreprise .fr-sidemenu__item.fr-sidemenu__item--active';
  const evaluationId = 2;

  await page.route('*/**/api/evaluations', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: evaluationId }),
    });
  });

  await page.route(`*/**/api/campagnes/${mockApiCampagne.code}`, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockApiCampagne),
    });
  });

  await page.route('*/**/api/evenements', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.goto(`/?code=${mockApiCampagne.code}&beneficiaire_id=${beneficiaireId}`);

  await page.click('button:has-text("Commencer")');
  await expect(page.locator(sousMenuThematiqueActif)).toHaveText("Identité & culture d'organisation");

  const legend = page.locator('legend');
  await expect(legend).toHaveText('Quelle est la taille de votre entreprise/structure ?');

  const radioChoices = page.locator('label');
  await radioChoices.first().click();

  page.waitForFunction(() => document.querySelector('label')?.textContent?.includes('A quelle branche'))

  await page.click('button:has-text("< Précédent")');
  await expect(legend).toHaveText('Quelle est la taille de votre entreprise/structure ?');
  await expect(page.locator('button:has-text("Continuer")')).toBeVisible();
});

test('reprend le deuxième questionnaire', async ({ page }) => {
  const sousMenuThematiqueActif = '.fr-sidemenu__item.fr-sidemenu__item--active button[aria-controls=evaluation_impact_general__constructys]'
  const evaluationId = "evaluation-123456"
  const campagneId = "campagne-123456"
  await page.route(`*/**/api/evaluations/${evaluationId}`, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: evaluationId, campagne_id: campagneId }),
    });
  });

  await page.route(`*/**/api/campagnes/${campagneId}`, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockApiCampagne),
    });
  });

  await page.route('*/**/api/evenements', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.goto(`/evaluation-impact?evaluation_id=${evaluationId}`);

  await expect(page.locator(sousMenuThematiqueActif)).toHaveText("Diagnostic des impacts sponsorisé par Constructys")
  await expect(page.locator('legend')).toHaveText("Avez-vous parfois l'impression de devoir prendre plus de temps que nécessaire pour vous assurer que vos collaborateurs ou collaboratrices ont bien compris certaines informations ?");

  const choicesList1 = page.locator('label');
  await expect(choicesList1.first()).toContainText('Oui');
  await choicesList1.first().click();
});

test("l'accueil redirige vers l'admin si le code campagne est manquant", async ({ page }) => {
  // eslint-disable-next-line no-undef
  await page.route(process.env.VITE_ADMIN_BASE_URL, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.goto('/');
  // eslint-disable-next-line no-undef
  await expect(page).toHaveURL(process.env.VITE_ADMIN_BASE_URL);
});
