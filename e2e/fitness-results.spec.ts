import { expect, test } from '@playwright/test';

test('shows animated macro and BMI charts before the personalized plan CTA', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('healthcalc-lang', 'en');
    localStorage.setItem('cookie_consent_accepted', 'true');
  });

  await page.goto('/fitness');
  await page.locator('#wiz-age').fill('30');
  await page.getByRole('button', { name: 'Female', exact: true }).click();
  await page.locator('#wiz-height').fill('168');
  await page.locator('#wiz-weight').fill('68');
  await page.locator('#fitness-goal').selectOption('lose');
  await page.getByRole('button', { name: /Calculate My Results/ }).click();

  const results = page.locator('#results');
  await expect(results.getByRole('heading', { name: 'Daily macro targets' })).toBeVisible();
  await expect(results.locator('.recharts-pie')).toBeVisible();
  await expect(results.getByRole('meter')).toHaveAttribute('aria-valuenow', '24.1');
  const planButton = page.getByRole('button', { name: /Get My Personalized Plan/ });
  await expect(planButton).toBeVisible();
  await planButton.click();
  await expect(page).toHaveURL(/\/weight-loss$/);
});
