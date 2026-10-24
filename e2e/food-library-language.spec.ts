import { expect, test } from '@playwright/test';

test('food names fall back to English outside Arabic and use Arabic only in Arabic mode', async ({ page }) => {
  test.setTimeout(240_000);
  await page.addInitScript(() => {
    localStorage.setItem('cookie_consent_accepted', 'true');
  });

  await page.goto('/food-library?lang=fr');
  await expect(page).toHaveURL(/\/food-library\?lang=fr$/);
  await page.locator('input[type="text"]').fill('Watercress');
  const frenchRow = page.locator('tbody tr').filter({ hasText: 'Watercress (Māori)' });
  await expect(frenchRow).toContainText('Watercress (Māori)');
  await expect(frenchRow).not.toContainText(/[\u0600-\u06FF]/);

  const headerActions = page.locator('.app-header-actions');
  await headerActions.getByRole('button', { name: 'FR', exact: true }).click();
  await headerActions.getByRole('button', { name: /العربية/ }).click();
  await expect(page.getByText('جرجير مائي ماوري', { exact: true })).toBeVisible();
});
