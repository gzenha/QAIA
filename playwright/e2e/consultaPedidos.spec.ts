import { test, expect } from '@playwright/test';

test('Consulta de Pedidos Aprovados', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  /*await page.getByTestId('search-order-id').click();  */
  await page.getByTestId('search-order-id').fill('VLO-I2798P');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click({timeout: 10000});
  await expect(page.getByText('Aprovado')).toBeVisible();
});