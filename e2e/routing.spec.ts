import { expect, test } from '@playwright/test';

test('header and footer internal links update the browser URL', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('healthcalc-lang', 'en');
    localStorage.setItem('cookie_consent_accepted', 'true');
  });

  await page.goto('/');

  await page.getByRole('navigation').first().getByRole('link', { name: 'Calculators & Fitness' }).click();
  await expect(page).toHaveURL(/\/fitness$/);

  await page.locator('footer.site-footer').getByRole('link', { name: 'Food Library' }).click();
  await expect(page).toHaveURL(/\/food-library$/);
});
