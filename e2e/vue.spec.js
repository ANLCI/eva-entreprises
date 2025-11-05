import { test, expect } from '@playwright/test';

import { mockApiCampagne } from './fixtures/campagne';
import { mockApiCampagne2 } from './fixtures/campagne2';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});


test('Complète le premier questionnaire', async ({ page }) => {
  const sousMenuThematiqueActif = '#diag_risques_entreprise .fr-sidemenu__item.fr-sidemenu__item--active'
  const evaluationId = 1;
  await page.route('*/**/api/evaluations', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: evaluationId }),
    });
  });

  // eslint-disable-next-line no-undef
  const codeCampagne = process.env.VITE_CODE_CAMPAGNE_EVA_ENTREPRISES;
  await page.route(`*/**/api/campagnes/${codeCampagne}`, (route) => {
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

  await page.goto('/');

  await page.click('button:has-text("Commencer")');
  await expect(page.locator('.progress-bar-fill')).toHaveAttribute('style', 'width: 50%;');

  await expect(page.locator(sousMenuThematiqueActif)).toHaveText("Identité & culture d'organisation")

  await expect(page).toHaveURL(`/situations/${mockApiCampagne.situations[0].id}`)

  await expect(page.locator('legend')).toHaveText('Quelle est la taille de votre entreprise/structure ?');

  const choicesList = page.locator('label');
  await expect(choicesList.first()).toContainText('250 salariés et +');
  await expect(choicesList.nth(1)).toContainText('50 à 249 salariés');

  await choicesList.first().click();

  await page.click('button:has-text("Continuer")');
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

test("Commence un questionnaire à partir d'un code campagne", async ({ page }) => {
  const evaluationId = 1;
  await page.route('*/**/api/evaluations', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: evaluationId }),
    });
  });
  await page.route(`*/**/api/campagnes/${mockApiCampagne2.code}`, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockApiCampagne2),
    });
  });
  await page.route('*/**/api/evenements', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.goto(`/?code=${mockApiCampagne2.code}`);

  await page.click('button:has-text("Commencer")');

  await expect(page).toHaveURL(`/situations/${mockApiCampagne2.situations[0].id}`)
});
