import { expect, test } from '@playwright/test';

const expectWizardStep = async (page: import('@playwright/test').Page, step: number) => {
  await expect(page.locator('.wiz-page > header')).toContainText(new RegExp(`Step\\s+${step}\\s+of\\s+13`));
};

const continueWizard = (page: import('@playwright/test').Page) =>
  page.locator('main').getByRole('button', { name: 'Continue', exact: true });

const openWizard = async (page: import('@playwright/test').Page) => {
  await page.goto('weight-loss?lang=en', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.wiz-page')).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  page.on('pageerror', (error) => console.error('Browser page error:', error.message));
  await page.addInitScript(() => {
    try {
      localStorage.setItem('healthcalc-lang', 'en');
      localStorage.setItem('cookie_consent_accepted', 'true');
    } catch {
      // The app can still fall back to its default English language.
    }
  });
});

test('completes the 13-step weight loss wizard and opens the generated plan', async ({ page }) => {
  await openWizard(page);
  await expectWizardStep(page, 1);
  await page.getByRole('button', { name: 'Start Now' }).click();

  await expectWizardStep(page, 2);
  await page.locator('#wz-age').fill('35');
  await page.getByRole('button', { name: /Female/ }).click();
  await continueWizard(page).click();

  await expectWizardStep(page, 3);
  await page.locator('#wz-height').fill('170');
  await page.locator('#wz-weight').fill('70');
  await continueWizard(page).click();

  await expectWizardStep(page, 4);
  await page.getByRole('button', { name: '8+ hours', exact: true }).click();
  await continueWizard(page).click();

  await expectWizardStep(page, 5);
  await page.getByRole('button', { name: '4 meals', exact: true }).click();
  await continueWizard(page).click();

  await expectWizardStep(page, 6);
  await page.getByRole('button', { name: /Maintain Weight/ }).click();
  await continueWizard(page).click();

  await expectWizardStep(page, 7);
  await page.getByRole('button', { name: /Build Muscle/ }).click();
  await continueWizard(page).click();

  await expectWizardStep(page, 8);
  await page.getByRole('button', { name: /Belly Fat/ }).click();
  await continueWizard(page).click();

  await expectWizardStep(page, 9);
  await page.getByRole('button', { name: 'Adjust', exact: true }).click();
  await page.getByRole('button', { name: /Strength/ }).click();
  await page.getByRole('button', { name: 'Save & Continue', exact: true }).click();

  await expectWizardStep(page, 10);
  await page.getByRole('button', { name: /Surprise Me/ }).click();
  await page.getByRole('button', { name: 'Accept', exact: true }).click();
  await continueWizard(page).click();

  await expectWizardStep(page, 11);
  await continueWizard(page).click();
  await expectWizardStep(page, 12);
  await expect(page.locator('main').getByRole('button', { name: 'Next', exact: true })).toBeEnabled();
  await page.locator('main').getByRole('button', { name: 'Next', exact: true }).click();

  await expectWizardStep(page, 13);
  await expect(page.getByRole('heading', { name: 'Your Personalized Plan is Ready!', level: 2, exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'View Full Plan', exact: true }).click();
  await expect(page.locator('.wiz-page main')).toContainText('Day 1');
});

test('restores the current step and selected form data after refresh', async ({ page }) => {
  await openWizard(page);
  await page.getByRole('button', { name: 'Start Now' }).click();

  await page.locator('#wz-age').fill('34');
  await page.getByRole('button', { name: /Female/ }).click();
  await continueWizard(page).click();

  await page.locator('#wz-height').fill('168');
  await page.locator('#wz-weight').fill('68');
  await continueWizard(page).click();

  await page.getByRole('button', { name: '8+ hours', exact: true }).click();
  await continueWizard(page).click();
  await page.getByRole('button', { name: '4 meals', exact: true }).click();
  await expectWizardStep(page, 5);

  await expect.poll(() => page.evaluate(() => {
    const raw = localStorage.getItem('healthcalc_wizard_draft_v1');
    return raw ? JSON.parse(raw).step : null;
  })).toBe(5);

  await page.reload();
  await expectWizardStep(page, 5);
  await expect(page.getByRole('button', { name: '4 meals', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
