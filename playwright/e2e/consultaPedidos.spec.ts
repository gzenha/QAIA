import { test, expect } from '@playwright/test';

test('Consulta de Pedidos Aprovados', async ({ page }) => {

  // numero do pedido
  const orderNumber = 'VLO-I2798P';

  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  /*await page.getByTestId('search-order-id').click();  */
  await page.getByTestId('search-order-id').fill(orderNumber);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click({timeout: 10000});
  

   // verificar se o container do pedido foi exibido
   const containerPedido = page.getByRole('paragraph')
   .filter({ hasText: /^Pedido$/ })
   .locator('..')
   await expect(containerPedido).toContainText(orderNumber, {timeout: 10000});

 // verificar se o pedido foi aprovado
   await expect(page.getByText('APROVADO')).toBeVisible();
});