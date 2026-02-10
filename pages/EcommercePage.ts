import { Page, expect } from '@playwright/test'

export class EcommercePage {
  constructor(private page: Page) {}

  // Selectores
  private txtTitulo = this.page.locator('h1')
  private btnComprar = this.page.locator('button#btn-buy')
  private inputEmail = this.page.locator('input[name="email"]')
  private msgError = this.page.locator('.error-message')

  async validarLanding() {
    await expect(this.txtTitulo).toContainText('Incorporation')
  }

  async capturarAtribucion(key: string) {
    // Valida que el script guardó los IDs en almacenamiento local
    return await this.page.evaluate((k) => localStorage.getItem(k), key)
  }

  async completarCheckout(email: string) {
    await this.inputEmail.fill(email)
    await this.btnComprar.click() // Redirección a Stripe
  }
}
