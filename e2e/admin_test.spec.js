import { test, expect } from '@playwright/test';

test('admin dashboard and modal verification', async ({ page }) => {
  await page.goto('http://localhost:5173/admin-login');
  await page.waitForTimeout(1000);

  // Fill login
  await page.fill('input[type="email"]', 'admin@sussex.com');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/home/jules/verification/admin_dashboard.png', fullPage: true });

  // Click Add New Package
  const addBtn = page.locator('button', { hasText: 'Add New Package' }).first();
  if (await addBtn.isVisible()) {
    await addBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/jules/verification/add_modal.png', fullPage: true });
  }
});
