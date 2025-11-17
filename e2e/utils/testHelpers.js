import { mockApiCampagne } from '../fixtures/campagne'

export async function mockCampagneRoutes(page, { evaluationId, campagne = mockApiCampagne }) {
  await page.route('*/**/api/evaluations', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: evaluationId }),
    })
  })

  await page.route(`*/**/api/campagnes/${campagne.code}`, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(campagne),
    })
  })

  await page.route('*/**/api/evenements', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    })
  })
}

export async function goToCampagne(page, { campagneCode = mockApiCampagne.code, beneficiaireId }) {
  await page.goto(`/?code=${campagneCode}&beneficiaire_id=${beneficiaireId}`)
  await page.click('button:has-text("Commencer")')
}

export async function mockEvaluationResumptionRoutes(page, { evaluationId, campagneId, campagne = mockApiCampagne }) {
  await page.route(`*/**/api/evaluations/${evaluationId}`, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: evaluationId, campagne_id: campagneId }),
    })
  })

  await page.route(`*/**/api/campagnes/${campagneId}`, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(campagne),
    })
  })

  await page.route('*/**/api/evenements', (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    })
  })
}

export async function mockAdminBaseRoute(page, adminUrl) {
  await page.route(adminUrl, (route) => {
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({}),
    })
  })
}

export function getQuestionnaireSelectors(page) {
  return {
    legend: page.locator('legend'),
    progressBar: page.locator('.progress-bar-fill'),
    boutonContinuer: page.locator('button:has-text("Continuer")'),
    boutonPrecedent: page.locator('button:has-text("< Précédent")'),
    champTexte: page.locator('input[type="text"]'),
    labels: page.locator('label'),
  }
}

