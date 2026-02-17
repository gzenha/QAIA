
import { test, expect } from '@playwright/test';
import { gerarCodigoPedido } from '../function/order';

// test.describe('Consulta pedido', ()=> {
//   test.beforeAll(async () => {
//     //roda uma vez antes de todos os testes

// })

test.describe('Consulta pedido', ()=> {
  
test.beforeEach(async ({page}) => {
    //roda uma vez antes de cada teste

  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
})

// test.describe('Consulta pedido', ()=> {
//   test.afterAll(async () => {
//     //roda uma vez depois de todos os testes

// })

// test.describe('Consulta pedido', ()=> {
//   test.afterEach(async () => {
//     //roda uma vez depois de cada estes

// })

test('Consulta de Pedidos Aprovados', async ({ page }) => {

  // numero do pedido
  const orderNumber = 'VLO-I2798P';

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



test('Teste de validacao de item nao encontrado', async ({ page }) => {

  const orderNumber = gerarCodigoPedido();

  await page.getByTestId('search-order-id').fill(orderNumber);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click({timeout: 10000});

//primeira forma de fazer funcionar  

// checa se existe validacao 
// await expect(page.locator('#root')).toContainText('Verifique o número do pedido');
// await expect(page.locator('#root')).toContainText('Pedido não encontrado');

// segunda forma de fazer funcionar 

// const title = page.getByRole('heading', {name: 'Pedido não encontrado'});
// await expect(title).toBeVisible({timeout:1000});
//  const mensagem = page.getByText('Verifique o número do pedido e tente novamente');
// const mensagem = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
// await expect(mensagem).toBeVisible({timeout: 10000}); 

// terceira forma de fazer funcionar - snapchot
await expect(page.locator('#root')).toMatchAriaSnapshot(`
- img
- heading "Pedido não encontrado" [level=3]
- paragraph: Verifique o número do pedido e tente novamente
`);



});

})