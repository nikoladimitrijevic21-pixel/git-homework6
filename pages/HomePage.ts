import { type Locator, type Page } from '@playwright/test';


export class HomePage {
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  //readonly addToCard: Locator
  readonly sortDropdown: Locator;
  readonly combinationPliers: Locator;
  readonly boltCutters: Locator;
  readonly SlipJointPliers: Locator;
  readonly combinationPliersPrice: Locator;
  readonly boltCuttersPrice: Locator;
  readonly SlipJointPliersPrice: Locator;
  readonly removeButton: Locator;

  constructor(private readonly page: Page) {
    this.cartBadge = page.getByTestId('cart-quantity');
    this.cartLink = page.getByTestId('nav-cart');
    //this.addToCard = page.getByRole('button', { name: 'Add to cart', exact: true });
    this.sortDropdown = page.getByLabel('Sort');
    this.combinationPliers= page.getByRole('heading', { level: 5, name: 'Combination Pliers', exact: true });
    this.boltCutters = page.getByRole('heading', { level: 5, name: 'Bolt Cutters', exact: true });
    this.SlipJointPliers = page.getByRole('heading', { level: 5, name: 'Slip Joint Pliers', exact: true });
    this.combinationPliersPrice = this.combinationPliers.getByTestId('unit-price');
    this.boltCuttersPrice = this.boltCutters.getByTestId('unit-price');
    this.SlipJointPliersPrice = this.SlipJointPliers.getByTestId('unit-price');
    this.removeButton = page.locator('a.btn.btn-danger');
  }

  async open(): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com');
  }

  async addItemToCart(productName: Locator): Promise<void> {
    await this.open();
    await productName.click();
    await this.page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  }

  async removeItemFromCart(): Promise<void> {
    await this.cartLink.click();
    await this.removeButton.first().click();

  }
}


    //const productRow = this.page
      //.getByRole('row')
      //.filter({ has: this.page.getByText(productName, { exact: true }) });

    //await productRow.locator('a.btn-danger').click();



    //await this.page.goto(`${BASE_URL}/checkout`);
    //const productRow = this.page
      //.getByRole('row')
      //.filter({ has: this.page.getByText(productName, { exact: true }) });

    //await productRow.locator('a.btn-danger').click();