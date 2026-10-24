import { expect, test } from '@playwright/test';

test('header and footer navigation update the URL and reset scroll to the top', async ({ page }) => {
  test.setTimeout(420_000);
  await page.addInitScript(() => {
    localStorage.setItem('healthcalc-lang', 'en');
    localStorage.setItem('cookie_consent_accepted', 'true');
  });

  await page.goto('/');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.getByRole('navigation').first().getByRole('link', { name: 'Calculators & Fitness' }).click();
  await expect(page).toHaveURL(/\/fitness$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.locator('footer.site-footer').getByRole('link', { name: 'Food Library' }).click();
  await expect(page).toHaveURL(/\/food-library$/);
  await expect(page.getByRole('heading', { name: /Calorie Library/ })).toBeVisible({ timeout: 240_000 });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
